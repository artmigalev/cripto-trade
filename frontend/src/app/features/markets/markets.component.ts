import { MarketService } from '@services/market.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MarketsTableComponent } from '@components/markets-table/markets-table.component';

@Component({
  selector: 'app-markets',
  imports: [MarketsTableComponent],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export default class MarketsComponent {
  private marketService = inject(MarketService);

  protected readonly pairs = computed(() => this.marketService.market().tickers);
}
