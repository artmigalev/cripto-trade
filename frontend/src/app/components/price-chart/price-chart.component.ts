import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ErrorChart } from '@enums/trade.enum';
import { Chart } from '@interfaces/chart.interface';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
@Component({
  selector: 'app-price-chart',
  // imports: [SpinnerComponent],
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceChartComponent implements AfterViewInit {
  @ViewChild('chart', { static: false }) chartRef!: ElementRef<HTMLElement>;
  readonly data = input.required<Chart['klines']>();
  errormsgs = ErrorChart;
  error = signal<string | null>(this.errormsgs.EMPTY_DATA);

  ngAfterViewInit() {
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
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(this.data()!);
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
