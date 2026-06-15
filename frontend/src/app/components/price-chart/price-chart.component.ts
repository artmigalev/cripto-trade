import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  ViewChild,
  AfterViewInit,
  effect,
} from '@angular/core';
import { ErrorChart } from '@enums/trade.enum';
import { Chart } from '@interfaces/chart.interface';
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
})
export class PriceChartComponent implements AfterViewInit {
  @ViewChild('chart', { static: false }) chartRef!: ElementRef<HTMLElement>;
  readonly history = input.required<Chart['historyCandles']>();
  readonly candle = input<Chart['lastRealtimeCandle']>();
  private chart: IChartApi | null = null;
  private series: ISeriesApi<'Candlestick'> | null = null;

  errormsgs = ErrorChart;
  error = signal<string | null>(this.errormsgs.EMPTY_DATA);

  constructor() {
    effect(() => {
      const history = this.history();
      if (history) {
        this.series?.setData(history);
      }
    });
    effect(() => {
      const candle = this.candle();
      if (candle) {
        this.series?.update(candle);
      }
    });
  }

  ngAfterViewInit() {
    if (!this.chartRef.nativeElement) {
      this.error.set(this.errormsgs.NOT_FOUNT_DATA);
      console.log(this.error());
      return;
    }
    this.init(this.chartRef.nativeElement);
  }

  init(container: HTMLElement) {
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
          return `${hours}:${minutes}:${seconds}`;
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

    this.series.setData(this.history()!);
    // this.chart.timeScale().fitContent();
  }
}
// / Price Chart (interactive)
// // A candlestick chart for the selected trading pair.
// // Initial candle history loaded via REST API (GET /api/v3/klines).
// // Chart updates in real time via WebSocket (<symbol>@kline_<interval>): the current candle updates live, a new candle is added when one closes.
// // The user can switch candle intervals: 1m, 5m, 15m, 1h, 1d. On switch, the chart reloads with new data.
// // Recommended library: lightweight-charts (TradingView).
