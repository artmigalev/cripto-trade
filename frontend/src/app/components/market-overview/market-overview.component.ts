import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarketCardComponent } from '@components/market-card/market-card.component';
import { Card } from '@interfaces/card.interface';

@Component({
  selector: 'app-market-overview',
  imports: [MarketCardComponent],
  templateUrl: './market-overview.component.html',
  styleUrl: './market-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketOverviewComponent {
  topCards = input<Card[]>();
}

// Display cards for the top pairs by trading volume (at least 5). Each card shows: pair symbol, current price, 24h change (percentage), volume.
// Price must be formatted with the correct number of decimal places (BTC pairs: 8 decimals, USDT pairs: 2 decimals).
// 24h change is displayed in green if positive, red if negative.
// Data is loaded from Binance Testnet API. Card prices update in real time via WebSocket !ticker@arr.
