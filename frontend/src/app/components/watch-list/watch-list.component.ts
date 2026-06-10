import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { HighlightDirective } from '@directives/highlight.directive';
import { Dashboard } from '@interfaces/dashboard.interface';
import { DashboardService } from '@services/dashboard.service';
import { ContentLoaderModule } from '@ngneat/content-loader';
@Component({
  selector: 'app-watch-list',
  imports: [MatListModule, MatIcon, HighlightDirective, ContentLoaderModule],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchListComponent {
  private readonly dashboardService = inject(DashboardService);
  favoritePairs = input<Dashboard['watchList']['favoritePairs']>();
  protected emptyList = computed(() => this.dashboardService.watchListCount() === 0);
  removeFavorite(symbol: string): Dashboard['watchList']['removePair'] {
    this.dashboardService.toggleFavorite(symbol);
  }
}
// The user can add any trading pair to the watchlist using an "Add to favorites" button.
// The Dashboard displays a watchlist panel with the list of favorite pairs, their current prices, and 24h change.
// Watchlist pair prices update in real time via WebSocket.
// The user can remove a pair from the watchlist.
// Clicking a pair in the watchlist navigates to the Trade page for that pair.
// The watchlist persists across sessions (localStorage).
