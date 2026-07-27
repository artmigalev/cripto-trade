import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { TableSchema } from '@interfaces/table.interface';
import { BriefTableItem, DataTable } from '@interfaces/portfolio.interface';
import { PortfolioService } from '@services/portfolio.service';
import { MarketOverviewComponent } from '@components/market-overview/market-overview.component';
import { WatchListComponent } from '@components/watch-list/watch-list.component';
import { PortfolioSummaryComponent } from '@components/portfolio-summary/portfolio-summary.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarketOverviewComponent,
    WatchListComponent,
    PortfolioSummaryComponent,
    SpinnerComponent,
  ],
})
export default class DashboardPageComponent {
  private dashboardService = inject(DashboardService);
  private readonly portfolioService = inject(PortfolioService);
  protected readonly portfolioAssets = computed(() =>
    this.briefAssetsMapper(
      this.portfolioService.state()?.assetTableData.slice(0, 3) || []
    )
  );
  protected readonly balance = computed(() =>
    this.portfolioService.portfolioValueUSD()
  );

  protected readonly topCards = computed(
    () => this.dashboardService.state().cards
  );

  protected readonly watchList = computed(() =>
    this.dashboardService.getFavoriteTickers()
  );

  protected readonly isLoad = computed(
    () => this.dashboardService.state().isLoad
  );
  protected readonly error = computed(
    () => this.dashboardService.state().error
  );

  schemaTable = computed(
    () =>
      ({
        columnsLabels: ['asset', 'currentPrice', 'totalValue'],
        displayedColumns: {
          asset: 'Asset',
          currentPrice: 'Price',
          totalValue: 'Total',
        },
        dataTable: this.portfolioAssets() || [],
        type: 'BriefTable',
      }) satisfies TableSchema<BriefTableItem>
  );
  private briefAssetsMapper(assetsData: DataTable[]): BriefTableItem[] {
    if (assetsData.length === 0) return [];
    return assetsData.map(asset => ({
      asset: asset.asset,
      currentPrice: asset.currentPrice,
      totalValue: asset.totalValue,
    }));
  }
}
