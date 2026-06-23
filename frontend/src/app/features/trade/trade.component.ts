import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PriceChartComponent } from '@components/price-chart/price-chart.component';
import { TradeService } from '@services/trade.service';
import { OrderBookComponent } from '@components/order-book/order-book.component';

@Component({
  selector: 'app-trade',
  imports: [PriceChartComponent, OrderBookComponent],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TradeComponent {
  private readonly tradeService = inject(TradeService);
  symbol = computed(() => this.tradeService.chartSymbol());
  historyCandles = computed(
    () => this.tradeService.state().chart.historyCandles
  );
  candle = computed(() => this.tradeService.state().chart.lastRealtimeCandle);
  order = computed(() => this.tradeService.state().orderBook);
}
