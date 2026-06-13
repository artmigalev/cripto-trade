import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  ViewChild, AfterViewInit,
} from '@angular/core';
import { ErrorChard } from '@enums/trade.enum';
import {
  createChart,
  ColorType,
  CandlestickSeries,
  OhlcData,
} from 'lightweight-charts';
@Component({
  selector: 'app-price-chart',
  // imports: [SpinnerComponent],
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceChartComponent implements AfterViewInit {
  @ViewChild('chart', { static: false }) chartRef!: ElementRef<HTMLElement>;
  protected readonly data = input<OhlcData[]>();
  errormsgs = ErrorChard;
  error = signal<string | null>(this.errormsgs.EMPTY_DATA);

  ngAfterViewInit() {
    console.log(this.chartRef.nativeElement);

    if (!this.chartRef.nativeElement) {
      this.error.set(this.errormsgs.NOT_FOUNT_DATA);
      console.log(this.error());
      return;
    }
    this.init(this.chartRef.nativeElement);
  }

  init(container: HTMLElement) {
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'black',
      },

      autoSize: true,
    });
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData([
      {
        time: '2018-12-22',
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: '2018-12-24',
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: '2018-12-26',
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: '2018-12-28',
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: '2018-12-29',
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: '2018-12-30',
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: '2018-12-31',
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);
    chart.timeScale().fitContent();
    // chart.addCandlestickSeries();
  }
}
// / Price Chart (interactive)
// // A candlestick chart for the selected trading pair.
// // Initial candle history loaded via REST API (GET /api/v3/klines).
// // Chart updates in real time via WebSocket (<symbol>@kline_<interval>): the current candle updates live, a new candle is added when one closes.
// // The user can switch candle intervals: 1m, 5m, 15m, 1h, 1d. On switch, the chart reloads with new data.
// // Recommended library: lightweight-charts (TradingView).
