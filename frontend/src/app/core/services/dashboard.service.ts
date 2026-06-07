import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardEnums } from '@enums/dashboard.enum';
import { Card } from '@interfaces/card.interface';
import { Dashboard } from '@interfaces/dashboard.interface';
import { Ticker, TickerStreamsPayload } from '@interfaces/ticker.interfaсe';
import { ApiService } from '@services/api.service';
import { MarketService } from '@services/market.service';
import { WebsocketService } from '@services/websocket.service';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly serviceApi = inject(ApiService);
  private readonly marketService = inject(MarketService);
  private readonly websocket = inject(WebsocketService);
  private destroyRef = inject(DestroyRef);

  private readonly _state = signal<Dashboard['state']>({
    cards: [],
    watchList: this.loadWatchList(),
    isLoad: false,
    error: '',
  });

  watchListCount = computed(() => this._state().watchList.length);

  state = this._state.asReadonly();

  constructor() {
    this.updateTickers();
    effect(() => {
      const cards = this._state().cards;

      if (cards.length > 0) {
        this.updateTickers();
      }
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
  updateTickers() {
    // const allCards = this._state().cards

    this.websocket.tickers$
      .pipe(
        // tap(data => console.log('WS data:', data, 'currentSymbols:', currentSymbols)),
        filter<TickerStreamsPayload[]>(tickers => {
          const currentSymbols = this._state().cards.map(card => card.symbol);
          const hash = tickers.some(ticker => {
            return currentSymbols.includes(ticker.s);
          });

          return hash;
        }),
        map(tickers => {
          return tickers.map(
            ticker =>
              ({
                symbol: ticker.s,
                currentPrice: ticker.c,
                change24h: ticker.P,
                volume: ticker.q,
              }) satisfies Card
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: tickers => {
          this._state.update(prev => ({
            ...prev,
            cards: prev.cards.map(card => {
              const findCard = tickers.find(ticker => ticker.symbol === card.symbol);

              return findCard
                ? {
                    ...card,
                    currentPrice: findCard.currentPrice,
                    change24h: findCard.change24h || card.change24h,
                  }
                : card;
            }),
          }));
        },
        error: error => {
          console.log(error);
        },
        complete: () => 'complete',
      });
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
