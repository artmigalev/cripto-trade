import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MarketOverviewComponent } from '@components/market-overview/market-overview.component';
import { WatchListComponent } from '@components/watch-list/watch-list.component';
import { PortfolioSummaryComponent } from '@components/portfolio-summary/portfolio-summary.component';
import { DashboardService } from '@services/dashboard.service';
import { PortfolioValue } from '@enums/dashboard.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarketOverviewComponent, WatchListComponent, PortfolioSummaryComponent],
})
export default class DashboardPageComponent {
  private dashboardService = inject(DashboardService);
  protected readonly topCards = computed(() => this.dashboardService.state().cards);

  protected readonly watchList = computed(() => this.dashboardService.getFavoriteTickers());
  protected readonly portfolioSummary = `1000 ${PortfolioValue.USDT}`;

  // protected readonly topPairsByTrading =

  protected readonly isLoad = computed(() => this.dashboardService.state().isLoad);
  protected readonly error = computed(() => this.dashboardService.state().error);
}
