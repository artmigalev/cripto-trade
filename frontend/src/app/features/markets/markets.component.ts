import { MarketService } from '@services/market.service';
import { FavoriteSymbol, TickedKeys } from '@enums/keys.enum';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-markets',
  imports: [MatTabGroup, MatTab, MatTableModule],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export default class MarketsComponent {
  private marketService = inject(MarketService);

  favoriteSymbols = [...Object.values(FavoriteSymbol), 'ALL'];

  private searchValue = computed(() => this.marketService.searchValue());
  private activeTab = signal<string>('all'); //USDT, BTC, ETH
  allMarket = computed(() => this.marketService.market().tickers);

  displayedColumns: string[] = Object.values(TickedKeys);

  sortedTickers = computed(() => this.marketService.sortByQuery(this.favoriteSymbols));

  filterMarkets = computed(() => {
    let markets = this.allMarket();
    const query = this.searchValue().toLowerCase();
    const tab = this.activeTab().toLowerCase();
    if (query) {
      markets = markets.filter(marker => marker.symbol.toLowerCase().includes(query));
    }

    if (tab !== 'all') {
      markets = markets.filter(ticket => ticket.symbol.endsWith(tab));
    }
    return markets;
  });
  protected readonly isLoad = signal(false);
  protected readonly error = signal('');
}
