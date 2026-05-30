import { MarketService } from '@services/market.service';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MarketCardComponent } from '@components/market-card/market-card.component';
import { DashboardErrors } from '@enums/custom-error-message.enum';

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

  constructor() {
    this.loadData();
  }

  async loadData() {
    this.isLoad.set(true);
    this.error.set('');

    try {
      await this.markedService.loadedData();
    } catch {
      this.error.set(DashboardErrors.Load);
    } finally {
      this.isLoad.set(false);
    }
  }
}
