import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  linkedSignal,
  signal,
} from '@angular/core';
import { ApiService } from '@services/api.service';
import {
  Ticker,
  TickerMarketType,
  TickerStreamsPayload,
} from '@interfaces/ticker.interfaсe';
import { Market } from '@interfaces/market.interface';
import { MarketStreams, MarketTable, MarketTabs } from '@enums/market.enum';
import { WebsocketService } from '@services/websocket.service';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private serviceApi = inject(ApiService);
  private readonly socketService = inject(WebsocketService);
  private destroyRef = inject(DestroyRef);

  tickers$ = this.socketService.tickers$;

  stream = MarketStreams['TICKERS'];

  private readonly _market = signal<Market['state']>({
    tickers: {
      [MarketTabs['USDT']]: [],
      [MarketTabs['BTC']]: [],
      [MarketTabs['ETH']]: [],
      [MarketTabs['ALL']]: [],
    },
    searchValue: '',
  });
  private readonly _tableState = signal<Market['tableState']>({
    currentTab: MarketTabs['ALL'],
    column: 'Pair',
    direction: 'asc',
  });

  tableState = this._tableState.asReadonly();

  market = this._market.asReadonly();

  searchValue = linkedSignal(() => this._market().searchValue);
  constructor() {
    // Слушаем WebSocket когда данные загружены
    effect(() => {
      const tickers = this._market().tickers['ALL'];

      if (tickers.length > 0) {
        this.updateTickers();
      }
    });
  }

  async init() {
    const tickersState = await this.filterByQuote();
    this._market.update(prev => ({
      ...prev,
      tickers: tickersState,
    }));
  }

  setSearch(value: string): ReturnType<Market['setSearch']> {
    this._market.update(prev => ({
      ...prev,
      searchValue: value,
    }));
  }

  async loadedData(): Promise<TickerMarketType[]> {
    const response = await this.serviceApi.getTicker24hr();
    const data = Array.isArray(response) ? response : [response];

    const topTickets = this.getTopTickers(data, ['USDT', 'BTC', 'ETH']);

    return topTickets.map(
      ticker =>
        ({
          symbol: ticker.symbol,
          lastPrice: ticker.lastPrice,
          volume: ticker.volume,
          priceChangePercent: ticker.priceChangePercent,
        }) satisfies TickerMarketType
    );
  }
  getTopTickers(
    tickets: Ticker[],
    query: string[]
  ): ReturnType<Market['getTopTickers']> {
    return tickets
      .filter(ticket => {
        const { symbol } = ticket;

        return query.some(querySymbol => String(symbol).endsWith(querySymbol));
      })
      .sort(
        (a, b) =>
          parseFloat(b['quoteVolume'] as string) -
          parseFloat(a['quoteVolume'] as string)
      );
  }

  async filterByQuote(
    data?: TickerMarketType[]
  ): Promise<Record<MarketTabs, TickerMarketType[]>> {
    const allTickers = data || (await this.loadedData());

    return Object.entries(this._market().tickers).reduce(
      (acc, [tab]) => ({
        ...acc,
        [tab]:
          tab === MarketTabs['ALL']
            ? allTickers
            : allTickers.filter(ticker => ticker.symbol.endsWith(tab)),
      }),
      {
        [MarketTabs['ALL']]: [],
        [MarketTabs['USDT']]: [],
        [MarketTabs['BTC']]: [],
        [MarketTabs['ETH']]: [],
      } satisfies Record<MarketTabs, TickerMarketType[]>
    );
  }

  setTab(tab: MarketTabs) {
    this._tableState.update(prev => ({
      ...prev,
      currentTab: tab,
    }));
  }
  setSorting(column: keyof typeof MarketTable) {
    this._tableState.update(prev => ({
      ...prev,
      column: column || prev.column,
      direction: prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  sortedTickers = computed(() => {
    const { currentTab, column, direction } = this._tableState();
    const valueTicker = MarketTable[column];
    const tickers = this._market()['tickers'][currentTab];
    return [...tickers]
      .sort((a, b) => {
        return direction === 'asc'
          ? parseFloat(a[valueTicker] as string) - parseFloat(b[valueTicker])
          : parseFloat(b[valueTicker]) - parseFloat(a[valueTicker]);
      })
      .filter(ticker =>
        ticker.symbol
          .toLowerCase()
          .includes(this._market().searchValue.toLowerCase())
      );
  });

  updateTickers() {
    // const allCards = this._state().cards

    this.tickers$
      .pipe(
        filter<TickerStreamsPayload[]>(tickers => {
          const currentSymbols = this._market().tickers['ALL'].map(
            card => card.symbol
          );
          const hash = tickers.some(ticker => {
            return currentSymbols.includes(ticker.s);
          });

          return hash;
        }),
        map(tickers => {
          const updatedTickers = tickers.map(
            ticker =>
              ({
                symbol: ticker.s,
                lastPrice: ticker.p,
                volume: ticker.q,
                priceChangePercent: ticker.P,
              }) satisfies TickerMarketType
          );

          return updatedTickers;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (updatedTickers: TickerMarketType[]) => {
          this._market.update(prev => ({
            ...prev,
            tickers: Object.entries(prev.tickers).reduce(
              (acc, [tab, tickers]) => ({
                ...acc,
                [tab]: tickers.map(card => {
                  const updated = updatedTickers.find(
                    t => t.symbol === card.symbol
                  );
                  return updated
                    ? {
                        symbol: card.symbol,
                        lastPrice: updated.lastPrice || card.lastPrice,
                        volume: updated.volume || card.volume,
                        priceChangePercent:
                          updated.priceChangePercent || card.priceChangePercent,
                      }
                    : card;
                }),
              }),
              {} as Record<MarketTabs, TickerMarketType[]>
            ),
          }));
        },
        error: error => {
          console.log(error);
        },
        complete: () => 'complete',
      });
  }
}
