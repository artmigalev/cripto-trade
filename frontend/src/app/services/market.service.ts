import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ApiService, Ticker24hrResponse } from './api.service';
import { Key } from '@/enums/keys.enum';

export interface Ticker {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
}

interface Market {
  tickers: Ticker[];
  watchList: string[];
}

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  serviceApi = inject(ApiService);
  private readonly _market = signal<Market>({
    tickers: [],
    watchList: this.loadWatchList(),
  });
  market = this._market.asReadonly();

  watchListCount = computed(() => this._market().watchList.length);

  constructor() {
    effect(() => {
      localStorage.setItem(Key.CRYPTO_WATCHLIST, JSON.stringify(this._market().watchList));
    });
  }

  toggleFavorite(symbol: string) {
    const current = this._market().watchList;
    if (current.includes(symbol)) {
      this._market.update(prev => ({
        ...prev,
        watchList: prev.watchList.filter(item => item !== symbol),
      }));
    } else {
      this._market.update(prev => ({
        ...prev,
        watchList: [...prev.watchList, symbol],
      }));
    }
  }

  isFavorite(symbol: string) {
    return this._market().watchList.includes(symbol);
  }

  async loadedData() {
    const response = await this.serviceApi.getTicker24hr();
    const data = Array.isArray(response) ? response : [response];

    const topTickets = this.getTopTickers(data, ['USDT', 'BTC']);

    const ticketsData = topTickets.map(ticker => ({
      symbol: ticker['symbol'] as string,
      price: parseFloat(ticker['priceChange'] as string),
      change24h: parseFloat(ticker['priceChangePercent'] as string),
      volume: parseFloat(ticker['volume'] as string),
    }));

    this._market.update(prev => ({
      ...prev,
      tickers: ticketsData,
    }));
  }
  getTopTickers(tickets: Ticker24hrResponse[], query: string[]) {
    return tickets
      .filter(ticket => {
        const { symbol } = ticket;
        for (const querySymbol of query) {
          if (typeof symbol === 'string' && symbol.endsWith(querySymbol)) {
            return ticket;
          }
        }
        return null;
      })
      .sort(
        (a, b) => parseFloat(b['quoteVolume'] as string) - parseFloat(a['quoteVolume'] as string)
      );
  }

  sortByQuery(query: string[]) {
    const result: Record<string, Ticker[]> = {};
    const allTickers = this._market().tickers;

    for (const symbol of query) {
      const tickers = allTickers.filter(ticker => ticker.symbol.endsWith(symbol));

      if (symbol === 'ALL') {
        result[symbol] = allTickers;
      } else {
        result[symbol] = tickers;
      }
    }

    return result;
  }

  loadWatchList() {
    const saved = localStorage.getItem(Key.CRYPTO_WATCHLIST);
    return saved ? JSON.parse(saved) : ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
  }
}
