import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

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

    const ticketsData = data.map((ticker) => ({
      symbol: ticker.symbol,
      priceChange: parseFloat(ticker.priceChange),
      priceChangePercent: parseFloat(ticker.priceChangePercent),
      volume: parseFloat(ticker.volume),
    }));

    this._market.update((prev) => ({
      ...prev,
      tickedData: ticketsData,
    }));
  }
}
