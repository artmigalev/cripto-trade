import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '@interfaces/card.interface';
import { DashboardService } from '@services/dashboard.service';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteSymbol } from '@enums/keys.enum';
import { ConverterPipe } from '@pipes/converter.pipe';
import { HighlightDirective } from '@directives/highlight.directive';

@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [
    MatCardModule,
    ContentLoaderModule,
    MatIconModule,
    MatButtonModule,
    ConverterPipe,
    HighlightDirective,
  ],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent<T extends Card> {
  iconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  dashboardService = inject(DashboardService);
  protected readonly isFavorite = computed(() =>
    this.dashboardService.isFavorite(this.ticker()?.symbol as string)
  );

  favorit = signal<boolean>(false);

  ticker = input<T>();

  iconClasses = computed(() =>
    this.createdIconNameWithSymbol(this.ticker()?.symbol || 'BTCUSDT')
  );

  constructor() {
    this.iconRegistry.addSvgIcon(
      'favorit_btn',
      this.sanitizer.bypassSecurityTrustResourceUrl('/favorit_card.svg')
    );
    this.iconRegistry.addSvgIcon(
      'favorit_btn_toggle',
      this.sanitizer.bypassSecurityTrustResourceUrl('/favorite_toggle.svg')
    );
  }

  toggleCard(symbol: Card['symbol']) {
    this.dashboardService.toggleFavorite(symbol);
  }

  createdIconNameWithSymbol(symbol: T['symbol']) {
    const icons = [];
    if (symbol.endsWith(FavoriteSymbol['USDT'])) {
      icons.push(
        ...[
          symbol.replace(FavoriteSymbol.USDT, '').toLowerCase(),
          FavoriteSymbol['USDT'].toLowerCase(),
        ]
      );
    }
    if (symbol.endsWith(FavoriteSymbol['BTC'])) {
      icons.push(
        ...[
          symbol.replace(FavoriteSymbol.BTC, '').toLowerCase(),
          FavoriteSymbol['BTC'].toLowerCase(),
        ]
      );
    }

    return icons;
  }
}
// ticker = input.required<Card>();

// toggle() {
//   this.dashboardService.toggleFavorite(this.ticker()?.symbol as string);
// }
