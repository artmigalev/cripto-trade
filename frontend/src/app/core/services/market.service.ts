import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Ticker } from '@/app/interfaces/ticker.interfaсe';
import { DirectionType, Market } from '@interfaces/market.interface';
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
  sortingByColumn(tab: MarketTabs, column: MarketTable, direction: DirectionType): Ticker[] {
    const tickers = this.market().tickers[tab];

    return tickers.sort((a, b) => {
      return direction === 'asc'
        ? parseFloat(a[column] as string) - parseFloat(b[column])
        : parseFloat(b[column]) - parseFloat(a[column]);
    });
  }
}
