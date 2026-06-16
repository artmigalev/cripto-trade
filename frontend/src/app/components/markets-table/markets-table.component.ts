import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MarketTable, MarketTableColumns } from '@enums/market.enum';
import { MarketService } from '@services/market.service';
import { DashboardService } from '@services/dashboard.service';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-markets-table',
  imports: [MatTableModule, MatIcon, MatButtonModule, RouterLink],
  templateUrl: './markets-table.component.html',
  styleUrl: './markets-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsTableComponent {
  private readonly marketService = inject(MarketService);
  private readonly dashboardService = inject(DashboardService);
  private readonly router = inject(Router);
  pairs = this.marketService.sortedTickers;
  tab = computed(() => this.marketService.tableState().currentTab);

  protected columns = Object.entries(MarketTableColumns);

  private favoritesSet = computed(
    () => new Set(this.dashboardService.state().watchList)
  );

  isFavorite(symbol: string): boolean {
    return this.favoritesSet().has(symbol);
  }

  toggleFavorite(symbol: string, event: Event) {
    event.stopPropagation();
    this.dashboardService.toggleFavorite(symbol);
  }

  toggleSortColumn(event: Event, column: string) {
    event.preventDefault();

    this.marketService.setSorting(column as keyof typeof MarketTable);
  }
}
// Display a table of all available trading pairs fetched from Binance Testnet API.
// Columns: Pair, Price, 24h Change (%), 24h Volume.
// Table data updates in real time via WebSocket (!ticker@arr) without page reload.
// Rows are clickable — clicking a pair navigates to the Trade page for that pair.
