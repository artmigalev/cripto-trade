import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MarketService } from '@services/market.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly marketService = inject(MarketService);

  private readonly subjectSearch = new Subject<string>();

  constructor() {
    this.subjectSearch
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => this.marketService.setSearch(value));
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.subjectSearch.next(input.value);
  }
}
