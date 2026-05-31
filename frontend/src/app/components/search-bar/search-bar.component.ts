import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MarketService } from '@services/market.service';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly marketService = inject(MarketService);

  private readonly subjectSearch = new Subject<Event>();

  private search$ = this.subjectSearch.pipe(
    map(event => (event.target as HTMLInputElement).value),
    debounceTime(300),
    distinctUntilChanged()
  );

  onSearch(event: Event) {
    this.subjectSearch.next(event);

    this.search$.subscribe(value => this.marketService.setSearch(value));
  }
}
