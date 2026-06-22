import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
} from '@angular/core';
import { PriceChartComponent } from '@components/price-chart/price-chart.component';
import { TradeService } from '@services/trade.service';
import { WebsocketService } from '@services/websocket.service';

@Component({
  selector: 'app-trade',
  imports: [PriceChartComponent],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TradeComponent implements OnDestroy {
  private readonly tradeService = inject(TradeService);
  historyCandles = computed(
    () => this.tradeService.state().chart.historyCandles
  );
  candle = computed(() => this.tradeService.state().chart.lastRealtimeCandle);
  private webSocketService = inject(WebsocketService);

  constructor() {
    console.log('kline', this.candle());
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    const streamName = this.tradeService.createdStreamName();
    this.webSocketService.unsubscribeStream(streamName);
  }
}
