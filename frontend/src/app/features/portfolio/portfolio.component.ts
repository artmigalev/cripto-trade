import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Balance } from '@interfaces/api.interface';
import { PortfolioService } from '@services/portfolio.service';
import { mapperBalanceToPieChartData } from '@/app/shared/mappers/pie-chart.mapper';
import { OrderHistoryComponent } from '@components/order-history/order-history.component';
import { OrderHistory } from '@interfaces/portfolio.interface';

@Component({
  selector: 'app-portfolio',
  imports: [OrderHistoryComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);

  protected readonly assets = computed<Balance[] | null>(
    () => this.portfolioService.state()?.assetTableData || null
  );
  portfolioValue = computed(() => this.portfolioService.portfolioValueUSD());
  distributionData = computed(() =>
    this.portfolioService
      .state()
      ?.assetTableData.map(asset => mapperBalanceToPieChartData(asset))
  );

  historyOrders: OrderHistory[] = [mock, moc2];
}
const mock = {
  time: 0,
  symbol: 'BTCUSDT',
  side: 'Buy',
  type: 'Market',
  preventedQuantity: '0.2',
  price: '0.1',
  status: 'new',
} satisfies OrderHistory;
const moc2 = {
  time: 0,
  symbol: 'BTCUSDT',
  side: 'Sell',
  type: 'Market',
  preventedQuantity: '0.2',
  price: '0.1',
  status: 'new',
} satisfies OrderHistory;
