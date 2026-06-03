import { MarketService } from '@services/market.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-markets',
  imports: [],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export default class MarketsComponent {
  private marketService = inject(MarketService);

  protected readonly pairs = computed(() => this.marketService.market().tickers);
}
