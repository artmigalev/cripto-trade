import { MarketService } from '@services/market.service';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MarketCardComponent } from '@components/market-card/market-card.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarketCardComponent],
})
export default class DashboardPageComponent {
  private markedService = inject(MarketService);

  protected readonly tickers = computed(() => this.markedService.market().tickers);
  protected readonly isLoad = signal(false);
  protected readonly error = signal('');
}
