import { MarketService } from '@services/market.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketOverviewComponent } from '@components/market-overview/market-overview.component';
import { WatchListComponent } from '@components/watch-list/watch-list.component';
import { PortfolioSummaryComponent } from '@components/portfolio-summary/portfolio-summary.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarketOverviewComponent, WatchListComponent, PortfolioSummaryComponent],
})
export default class DashboardPageComponent {
  private markedService = inject(MarketService);
  protected readonly tickers = computed(() => this.markedService.market().tickers);

  protected readonly topCards = this.tickers().slice(0, 10);
  protected readonly watchList = [];
  protected readonly portfolioSummary = [];

  // protected readonly topPairsByTrading =

  protected readonly isLoad = signal(false);
  protected readonly error = signal('');
}
