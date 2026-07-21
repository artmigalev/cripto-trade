import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PortfolioService } from '@services/portfolio.service';
import { mapperBalanceToPieChartData } from '@/app/shared/mappers/pie-chart.mapper';
import {
  DataTable,
  OrderHistory,
  Portfolio,
} from '@interfaces/portfolio.interface';
import { MatTabsModule } from '@angular/material/tabs';
import { WidgetComponent } from '@components/widget/widget.component';
import { DistributionComponent } from '@components/distribution/distribution.component';
import { tableOptions, TableTrade } from '@interfaces/trade-table.interface';
import { TableTradeComponent } from '@components/table-trade/table-trade.component';

@Component({
  selector: 'app-portfolio',
  imports: [
    MatTabsModule,
    WidgetComponent,
    DistributionComponent,
    TableTradeComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PortfolioComponent {
  private readonly portfolioService = inject(PortfolioService);

  protected assets = computed<DataTable[] | null>(
    () => this.portfolioService.state()?.assetTableData || null
  );
  portfolioValue = computed(() => this.portfolioService.portfolioValueUSD());
  distributionData = computed(() =>
    this.portfolioService
      .state()
      ?.assetTableData.map(asset => mapperBalanceToPieChartData(asset))
  );

  historyOrders: OrderHistory[] = [mock, moc2];

  tables = {
    orderHistory: {
      labels: [
        'time',
        'symbol',
        'side',
        'type',
        'preventedQuantity',
        'price',
        'status',
      ] satisfies TableTrade<OrderHistory>['columnsLabels'],
      displayedColumns: {
        time: 'Date',
        symbol: 'Pair',
        side: 'Side',
        type: 'Type',
        preventedQuantity: 'Quantity',
        price: 'Price',
        status: 'Status',
      },
      options: {
        sortOptions: {
          status: true,
          columns: ['side', 'type'],
        },
        convert: {
          status: false,
        },
      } satisfies tableOptions<OrderHistory>,
    },
    assets: {
      labels: [
        'asset',
        'free',
        'locked',
        'currentPrice',
        'totalValue',
      ] satisfies TableTrade<DataTable>['columnsLabels'],
      displayedColumns: {
        asset: 'Asset',
        free: 'Available Balance',
        locked: 'In Order',
        currentPrice: 'Current Price',
        totalValue: 'Total Value',
      },
      options: {
        sortOptions: {
          status: false,
        },
        convert: {
          status: true,
          columns: ['currentPrice', 'totalValue'],
          value: 'USDT',
        },
      } satisfies tableOptions<DataTable>,
    },
  } satisfies Portfolio['tables'];
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
