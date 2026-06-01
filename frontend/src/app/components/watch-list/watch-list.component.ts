import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

const BTCUSDT = {
  symbol: 'BTCUSDT',
  priceChange: '-2102.39000000',
  priceChangePercent: '-2.854',
  weightedAvgPrice: '72956.37415481',
  openPrice: '73674.39000000',
  highPrice: '74306.97000000',
  lowPrice: '67914.29000000',
  lastPrice: '71572.00000000',
  volume: '399.05349000',
  quoteVolume: '29113495.72422420',
  openTime: 1780272000000,
  closeTime: 1780358399999,
  firstId: 2800774,
  lastId: 2847096,
  count: 46323,
};
const BTC = {
  symbol: 'BTCUSDT',
  priceChange: '-2102.39000000',
  priceChangePercent: '-2.854',
  weightedAvgPrice: '72956.37415481',
  openPrice: '73674.39000000',
  highPrice: '74306.97000000',
  lowPrice: '67914.29000000',
  lastPrice: '71572.00000000',
  volume: '399.05349000',
  quoteVolume: '29113495.72422420',
  openTime: 1780272000000,
  closeTime: 1780358399999,
  firstId: 2800774,
  lastId: 2847096,
  count: 46323,
};

const mockdataWatchList = [BTCUSDT, BTC];

@Component({
  selector: 'app-watch-list',
  imports: [MatListModule, MatIcon],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchListComponent {
  protected readonly favoritePairs = input(mockdataWatchList);
}
// The user can add any trading pair to the watchlist using an "Add to favorites" button.
// The Dashboard displays a watchlist panel with the list of favorite pairs, their current prices, and 24h change.
// Watchlist pair prices update in real time via WebSocket.
// The user can remove a pair from the watchlist.
// Clicking a pair in the watchlist navigates to the Trade page for that pair.
// The watchlist persists across sessions (localStorage).
