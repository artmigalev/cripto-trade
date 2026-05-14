// import { MarketCard } from '@/app/interfaces/market-card.interface';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ConverterPipe } from '../../pipes/converter.pipe';
import { HighlightDirective } from '@/app/directives/highlight.directive';
import { Ticker } from '@/app/services/market.service';
@Component({
  selector: 'app-market-card',
  standalone: true,
  imports: [ConverterPipe, HighlightDirective],
  templateUrl: './market-card.component.html',
  styleUrl: './market-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketCardComponent {
  ticker = input<Ticker>();
}
