import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketTabs } from '@enums/market.enum';
import { MatTabsModule } from '@angular/material/tabs';
import { MarketsTableComponent } from '@components/markets-table/markets-table.component';
import { MarketService } from '@services/market.service';
@Component({
  selector: 'app-tabs',
  imports: [MatTabsModule, MarketsTableComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  private readonly marketService = inject(MarketService);

  protected readonly tabsName = Object.values(MarketTabs);

  filteredPairs = this.marketService.filterByQuote(this.tabsName);
}
