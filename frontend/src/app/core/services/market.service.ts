import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Ticker } from '@/app/interfaces/ticker.interfaсe';
import { Market } from '@interfaces/market.interface';
import { MarketTable, MarketTabs } from '@enums/market.enum';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private serviceApi = inject(ApiService);
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

  async loadedData(): Promise<Ticker[]> {
    const response = await this.serviceApi.getTicker24hr();
    const data = Array.isArray(response) ? response : [response];

    const topTickets = this.getTopTickers(data, ['USDT', 'BTC', 'ETH']);

    return topTickets;
  }
  getTopTickers(tickets: Ticker[], query: string[]): ReturnType<Market['getTopTickers']> {
    return tickets
      .filter(ticket => {
        const { symbol } = ticket;

        return query.some(querySymbol => String(symbol).endsWith(querySymbol));
      })
      .sort(
        (a, b) => parseFloat(b['quoteVolume'] as string) - parseFloat(a['quoteVolume'] as string)
      );
  }

  async filterByQuote(): Promise<Record<MarketTabs, Ticker[]>> {
    const result: Record<string, Ticker[]> = {};
    const allTickers = await this.loadedData();
    const query = Object.values(MarketTabs);

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
    return [...tickers].sort((a, b) => {
      return direction === 'asc'
        ? parseFloat(a[valueTicker] as string) - parseFloat(b[valueTicker])
        : parseFloat(b[valueTicker]) - parseFloat(a[valueTicker]);
    });
  });
}
