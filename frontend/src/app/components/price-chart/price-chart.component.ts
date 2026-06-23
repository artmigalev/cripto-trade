import { mapStreamKline } from '@/app/shared/mappers/chart.mapper';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  AfterViewInit,
  effect,
  computed,
  inject,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { CandleIntervals, ErrorChart } from '@enums/trade.enum';
import { Chart } from '@interfaces/chart.interface';
import { TradeService } from '@services/trade.service';
import {
  createChart,
  ColorType,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // imports: [SpinnerComponent],
})
export class PriceChartComponent implements AfterViewInit, OnDestroy {
  private readonly tradeService = inject(TradeService);
  private chartRef = viewChild<ElementRef>('chart');
  readonly history = input.required<Chart['historyCandles']>();
  readonly candle = input<Chart['lastRealtimeCandle']>();
  private chart: IChartApi | null = null;
  private series: ISeriesApi<'Candlestick'> | null = null;
  protected readonly candleIntervals = Object.values(CandleIntervals);
  _activeInterval = computed(() => this.tradeService.activeInterval());
  private chartReady = signal<boolean>(false);
  errormsgs = ErrorChart;
  error = signal<string | null>(this.errormsgs.EMPTY_DATA);
  private historySignal = computed(() => this.history());
  private candleSignal = computed(() => this.candle());

  constructor() {
    effect(() => {
      if (!this.chartReady()) return;
      if (!this.series) return;
      const history = this.historySignal();
      const candle = this.candleSignal();
      if (!history || history.length === 0) {
        this.error.set(this.errormsgs.EMPTY_DATA);
        return;
      }
      this.error.set(null);
      const chartData = history.map(h => mapStreamKline(h));
      this.series.setData(chartData);
      if (candle) {
        console.log('candle', candle);
        const candleData = mapStreamKline(candle);
        console.log('candleData', candleData);
        this.series.update(candleData);
      }
    });
  }

  btnToggleInterval(interval: CandleIntervals) {
    this.tradeService.setInterval(interval);
  }

  ngAfterViewInit() {
    const container = this.chartRef()?.nativeElement;
    if (!container) return;
    this.init(container);
  }

  init(container: HTMLElement) {
    try {
      this.chart = createChart(container, {
        layout: {
          background: { type: ColorType.Solid, color: 'white' },
          textColor: 'black',
        },

        autoSize: true,
        localization: {
          timeFormatter: (timestamp: number) => {
            const date = new Date(timestamp * 1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          },
        },
      });
      this.series = this.chart.addSeries(CandlestickSeries, {
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      this.chartReady.set(true);
      this.chart.timeScale().fitContent();
    } catch (error) {
      console.error('Chart initialization error', error);
      this.error.set(this.errormsgs.NOT_FOUNT_DATA);
    }
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.remove();
      this.chart = null;
    }
    if (this.series) {
      this.series = null;
    }
  }
}
// / Price Chart (interactive)
// // A candlestick chart for the selected trading pair.
// // Initial candle history loaded via REST API (GET /api/v3/klines).
// // Chart updates in real time via WebSocket (<symbol>@kline_<interval>): the current candle updates live, a new candle is added when one closes.
// // The user can switch candle intervals: 1m, 5m, 15m, 1h, 1d. On switch, the chart reloads with new data.
// // Recommended library: lightweight-charts (TradingView).
