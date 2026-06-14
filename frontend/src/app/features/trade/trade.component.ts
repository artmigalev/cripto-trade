import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PriceChartComponent } from '@components/price-chart/price-chart.component';
import { TradeService } from '@services/trade.service';

@Component({
  selector: 'app-trade',
  imports: [PriceChartComponent],
  templateUrl: './trade.component.html',
  styleUrl: './trade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TradeComponent {
  private readonly tradeService = inject(TradeService);
  klines = computed(() => this.tradeService.state().chart.klines);
}
