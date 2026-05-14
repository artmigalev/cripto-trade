import { inject, Injectable, signal } from '@angular/core';
import { ApiService, Ticker24hrResponse } from './api.service';

export interface Ticker {
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
}

interface Market {
  tickedData: Ticker[];
}

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  serviceApi = inject(ApiService);
  readonly _market = signal<Market>({
    tickedData: [],
  });
  market = this._market.asReadonly();

  async loadedData() {
    const response = await this.serviceApi.getTicker24hr();
    const data = Array.isArray(response) ? response : [response];

    const topTickets = this.getTopTicked(data, ['USDT', 'BTC']);

    const ticketsData = topTickets.map((ticker) => ({
      symbol: ticker['symbol'] as string,
      priceChange: parseFloat(ticker['priceChange'] as string),
      priceChangePercent: parseFloat(ticker['priceChangePercent'] as string),
      volume: parseFloat(ticker['volume'] as string),
    }));

    this._market.update((prev) => ({
      ...prev,
      tickedData: ticketsData,
    }));
  }
  getTopTicked(tickets: Ticker24hrResponse[], query: string[]) {
    return tickets
      .filter((ticket) => {
        const { symbol } = ticket;
        for (const querySymbol in query) {
          if (typeof symbol === 'string' && symbol.endsWith(querySymbol)) {
            return ticket;
          }
        }
        return null;
      })
      .sort(
        (a, b) =>
          parseFloat(b['quoteVolume'] as string) -
          parseFloat(a['quoteVolume'] as string),
      )
      .slice(0, 5);
  }
}
