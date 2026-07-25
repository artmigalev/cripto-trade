import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { PortfolioValue } from '@enums/dashboard.enum';
import { TableComponent } from '@components/table/table.component';
import { TableSchema } from '@interfaces/table.interface';
import { BriefTableItem, DataTable } from '@interfaces/portfolio.interface';
import { PortfolioService } from '@services/portfolio.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableComponent],
})
export default class DashboardPageComponent {
  private dashboardService = inject(DashboardService);
  private readonly portfolioService = inject(PortfolioService);
  portfolioAssets = computed(() =>
    this.briefAssetsMapper(
      this.portfolioService.state()?.assetTableData.slice(0, 3) || []
    )
  );
  protected readonly topCards = computed(
    () => this.dashboardService.state().cards
  );

  protected readonly watchList = computed(() =>
    this.dashboardService.getFavoriteTickers()
  );
  protected readonly portfolioSummary = `1000 ${PortfolioValue.USDT}`;

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
