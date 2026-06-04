import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MarketTableColumns } from '@enums/market.enum';
import { Market } from '@interfaces/market.interface';
import { MarketService } from '@services/market.service';
import { DashboardService } from '@services/dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-markets-table',
  imports: [MatTableModule, MatIcon, MatButtonModule],
  templateUrl: './markets-table.component.html',
  styleUrl: './markets-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsTableComponent {
  private readonly marketService = inject(MarketService);
  private readonly dashboardService = inject(DashboardService);
  pairs = input<Market['state']['tickers']>();
  protected columns = Object.values(MarketTableColumns);

  private favoritesSet = computed(() => new Set(this.dashboardService.state().watchList));

  isFavorite(symbol: string): boolean {
    return this.favoritesSet().has(symbol);
  }

  toggleFavorite(symbol: string, event: Event) {
    event.stopPropagation();
    this.dashboardService.toggleFavorite(symbol);
  }
}
// Display a table of all available trading pairs fetched from Binance Testnet API.
// Columns: Pair, Price, 24h Change (%), 24h Volume.
// Table data updates in real time via WebSocket (!ticker@arr) without page reload.
// Rows are clickable — clicking a pair navigates to the Trade page for that pair.
