import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PriceChartComponent } from '@components/price-chart/price-chart.component';
import { TradeService } from '@services/trade.service';
import { WebsocketService } from '@services/websocket.service';
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
  private webSocketService = inject(WebsocketService);
  symbol = computed(() => this.tradeService.chartSymbol());
  historyCandles = computed(
    () => this.tradeService.state().chart.historyCandles
  );
  candle = computed(() => this.tradeService.state().chart.lastRealtimeCandle);
  order = computed(() => this.tradeService.state().orderBook);
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    const streamName = this.tradeService.createdStreamName();
    this.webSocketService.unsubscribeStream(streamName);
  }
}
