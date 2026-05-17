// import { MarketCard } from '@/app/interfaces/market-card.interface';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ConverterPipe } from '@pipes/converter.pipe';
import { HighlightDirective } from '@/app/shared/directives/highlight.directive';
import { MarketService } from '@/app/core/services/market.service';
import { Ticker } from '@interfaces/ticker.interfaсe';
@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [ConverterPipe, HighlightDirective],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent {
  private readonly marketService = inject(MarketService);

  ticker = input<Ticker>();

  toggle() {
    this.marketService.toggleFavorite(this.ticker()?.symbol as string);
  }
}
