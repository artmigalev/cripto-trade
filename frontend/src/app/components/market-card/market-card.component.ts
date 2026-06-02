// import { MarketCard } from '@/app/interfaces/market-card.interface';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MarketService } from '@/app/core/services/market.service';
import { Ticker } from '@interfaces/ticker.interfaсe';
import { MatCardModule } from '@angular/material/card';
import { Card } from '@interfaces/card.interface';
import { ConverterPipe } from '../../shared/pipes/converter.pipe';
import { HighlightDirective } from '@directives/highlight.directive';

@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [MatCardModule, ConverterPipe, HighlightDirective],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent {
  private readonly marketService = inject(MarketService);
  ticker = input.required<Ticker>();
  card = computed<Card>(() => ({
    symbol: this.ticker()?.symbol,
    currentPrice: this.ticker()?.lastPrice,
    change24h: this.ticker()?.priceChangePercent,
    volume: this.ticker()?.volume,
  }));
  protected readonly isFavorite = computed(() =>
    this.marketService.isFavorite(this.ticker()?.symbol as string)
  );

  toggle() {
    this.marketService.toggleFavorite(this.ticker()?.symbol as string);
  }
}
