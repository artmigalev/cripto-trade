import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DashboardEnums } from '@enums/dashboard.enum';
import { Card } from '@interfaces/card.interface';
import { Dashboard } from '@interfaces/dashboard.interface';
import { Ticker } from '@interfaces/ticker.interfaсe';
import { ApiService } from '@services/api.service';
import { MarketService } from '@services/market.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly serviceApi = inject(ApiService);
  private readonly marketService = inject(MarketService);

  private readonly _state = signal<Dashboard['state']>({
    cards: [],
    watchList: this.loadWatchList(),
    isLoad: false,
    error: '',
  });

  watchListCount = computed(() => this._state().watchList.length);

  state = this._state.asReadonly();

  constructor() {
    effect(() => {
      const watchList = this._state().watchList;
      if (watchList.length > 0) {
        localStorage.setItem(DashboardEnums['WatchList'], JSON.stringify(watchList));
      }
    });
  }
  loadWatchList(): [] | Dashboard['state']['watchList'] {
    const saved = localStorage.getItem(DashboardEnums['WatchList']);

    return saved ? JSON.parse(saved) : [];
  }
  isFavorite(symbol: string) {
    return this._state().watchList.includes(symbol);
  }

  getFavoriteTickers(): Card[] {
    const favTickets = this._state().watchList;

    return this._state().cards.filter(ticker => favTickets.includes(ticker.symbol));
  }

  toggleFavorite(
    symbol: Card['symbol']
  ): Dashboard['watchList']['removePair'] | Dashboard['marketOverview']['addFavorite'] {
    const current = this._state().watchList;
    console.log(symbol);
    if (current.includes(symbol)) {
      this._state.update(prev => ({
        ...prev,
        watchList: prev.watchList.filter(item => item !== symbol),
      }));
    } else {
      this._state.update(prev => ({
        ...prev,
        watchList: [...prev.watchList, symbol],
      }));
    }
  }

  async loadedData() {
    const response = await this.serviceApi.getTicker24hr();
    const data = Array.isArray(response) ? response : [response];

    const topTickets: Ticker[] = this.getTopTickers(data, ['USDT', 'BTC']);

    const stateCards = topTickets
      .map(ticker => {
        const { symbol, priceChangePercent, volume, lastPrice } = ticker;
        return {
          symbol,
          currentPrice: lastPrice,
          change24h: priceChangePercent,
          volume,
        } satisfies Card;
      })
      .slice(0, 12);

    this._state.update(prev => ({
      ...prev,
      cards: stateCards,
    }));
  }

  getTopTickers(tickets: Ticker[], query: string[]): Ticker[] {
    return tickets
      .filter(ticket => {
        const { symbol } = ticket;

        return query.some(querySymbol => String(symbol).endsWith(querySymbol));
      })
      .sort(
        (a, b) => parseFloat(b['quoteVolume'] as string) - parseFloat(a['quoteVolume'] as string)
      );
  }
}
