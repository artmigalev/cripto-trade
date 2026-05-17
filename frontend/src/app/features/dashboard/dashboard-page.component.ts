import { MarketService } from '@services/market.service';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MarketCardComponent } from '@components/market-card/market-card.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarketCardComponent],
})
export default class DashboardPageComponent implements OnInit {
  private markedService = inject(MarketService);

  tickers = computed(() => this.markedService.market().tickers);

  ngOnInit(): void {
    this.markedService.loadedData().catch(error => {
      console.error('Failed to load market data', error);
    });
  }
}
