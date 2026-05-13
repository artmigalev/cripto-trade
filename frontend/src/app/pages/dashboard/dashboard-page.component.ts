import { MarketCard } from '@/app/interfaces/market-card.interface';
import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarketCardComponent } from '@components/market-card/market-card.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [MarketCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export class DashboardPageComponent {
  cards: MarketCard[] = [
    {
      symbol: 'BTC',
      price: 50000,
      change24h: 0.5,
      volume: 500,
    },
    {
      symbol: 'USDT',
      price: 500,
      change24h: 0.5,
      volume: 500,
    },
    {
      symbol: 'BTC',
      price: 125005,
      change24h: 0.5,
      volume: 500,
    },
    {
      symbol: 'BTC',
      price: 5005,
      change24h: 0.5,
      volume: 500,
    },
    {
      symbol: 'USDT',
      price: 53500,
      change24h: 0.5,
      volume: 500,
    },
  ];
}
