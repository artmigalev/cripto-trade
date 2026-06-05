import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MarketTable, MarketTableColumns, MarketTabs } from '@enums/market.enum';
import { MarketService } from '@services/market.service';
import { DashboardService } from '@services/dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Ticker } from '@interfaces/ticker.interfaсe';
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
  pairs = input<Ticker[]>();
  tabsName = input.required<MarketTabs>();

  protected columns = Object.entries(MarketTableColumns);
  private direction = signal<'asc' | 'desc'>('asc');
  private favoritesSet = computed(() => new Set(this.dashboardService.state().watchList));

  isFavorite(symbol: string): boolean {
    return this.favoritesSet().has(symbol);
  }

  toggleFavorite(symbol: string, event: Event) {
    event.stopPropagation();
    this.dashboardService.toggleFavorite(symbol);
  }

  toggleSortColumn(event: Event, column: string) {
    event.preventDefault();

    const tickerKey = MarketTable[column as keyof typeof MarketTable];
    const tab: MarketTabs = this.tabsName();

    this.direction.update(current => (current === 'asc' ? 'desc' : 'asc'));
    this.marketService.sortingByColumn(tab, tickerKey, this.direction());
  }
}
// Display a table of all available trading pairs fetched from Binance Testnet API.
// Columns: Pair, Price, 24h Change (%), 24h Volume.
// Table data updates in real time via WebSocket (!ticker@arr) without page reload.
// Rows are clickable — clicking a pair navigates to the Trade page for that pair.
