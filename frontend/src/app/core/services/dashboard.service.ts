import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DashboardEnums } from '@enums/dashboard.enum';
import { Card } from '@interfaces/card.interface';
import { Dashboard } from '@interfaces/dashboard.interface';
import { TickerMarketType } from '@interfaces/ticker.interfaсe';
import { MarketService } from '@services/market.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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
      this.init();
      const watchList = this._state().watchList;
      if (watchList.length > 0) {
        localStorage.setItem(
          DashboardEnums['WatchList'],
          JSON.stringify(watchList)
        );
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

    return this._state().cards.filter(ticker =>
      favTickets.includes(ticker.symbol)
    );
  }

  toggleFavorite(
    symbol: Card['symbol']
  ):
    | Dashboard['watchList']['removePair']
    | Dashboard['marketOverview']['addFavorite'] {
    const current = this._state().watchList;
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

  init() {
    try {
      const allTickers = this.marketService.market().tickers;

      // Проверяем что данные загружены
      const isLoaded = Object.values(allTickers).some(tab => tab.length > 0);
      if (isLoaded) {
        const tickers = this.marketService.market().tickers;
        const topTickets: TickerMarketType[] = [
          ...tickers.BTC,
          ...tickers.ETH,
          ...tickers.USDT,
        ];
        const stateCards = topTickets
          .map(ticker => {
            const { symbol, priceChangePercent, volume, lastPrice } = ticker;

            return {
              symbol: symbol,
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
    } catch (error) {
      console.log(error);
    }
  }
}
