import { MarketService } from '@/app/services/market.service';
import { FavoriteSymbol } from '@/enums/keys.enum';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

// interface MarketTable {
//   pair: string;
//   price: string;
//   '24hChange': string;
//   '24hVolume': string;
// }

@Component({
  selector: 'app-markets',
  imports: [MatTabGroup, MatTab, MatTableModule],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MarketsComponent {
  private marketService = inject(MarketService);

  favoriteSymbols = [
    FavoriteSymbol.BTC,
    FavoriteSymbol.ETH,
    FavoriteSymbol.USDT,
    'ALL',
  ];

  searchValue = signal<string>('');
  activeTab = signal<string>('all'); //USDT, BTC, ETH
  allMarket = this.marketService.market().tickedData;

  displayedColumns: string[] = ['symbol', 'price', 'change24h', 'volume'];

  filterMarkets = computed(() => {
    const markets = this.allMarket;
    const query = this.searchValue().toLowerCase();
    const tab = this.activeTab().toLowerCase();

    if (query) {
      markets.filter((marker) => marker.symbol.toLowerCase().includes(query));
    }

    if (tab !== 'all') {
      markets.filter((ticket) => ticket.symbol.endsWith(tab));
    }
    return markets;
  });
}
