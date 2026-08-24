import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PriceChartComponent } from '@components/price-chart/price-chart.component';
import { TradeService } from '@services/trade.service';
import { OrderBookComponent } from '@components/order-book/order-book.component';
import { OrderFormComponent } from '@components/order-form/order-form.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-trade',
  imports: [PriceChartComponent, OrderBookComponent, OrderFormComponent],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TradeComponent {
  private readonly tradeService = inject(TradeService);
  private readonly authService = inject(AuthService);

  isAuth = computed(
    () =>
      this.authService.isAuthenticated() && this.authService.isApiConfigured()
  );

  symbol = computed(() => this.tradeService.chartSymbol());
  historyCandles = computed(
    () => this.tradeService.state().chart.historyCandles
  );
  candle = computed(() => this.tradeService.state().chart.lastRealtimeCandle);
  history = computed(() => this.tradeService.state().orderBook!);
}
