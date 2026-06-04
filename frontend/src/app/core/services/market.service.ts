import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Ticker } from '@/app/interfaces/ticker.interfaсe';
import { Market } from '@interfaces/market.interface';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private serviceApi = inject(ApiService);
  private readonly _market = signal<Market['state']>({
    tickers: [],
    searchValue: '',
  });

  market = this._market.asReadonly();

  searchValue = linkedSignal(() => this._market().searchValue);

  setSearch(value: string): ReturnType<Market['setSearch']> {
    this._market.update(prev => ({
      ...prev,
      searchValue: value,
    }));
  }

  async loadedData(): ReturnType<Market['loadedData']> {
    const response = await this.serviceApi.getTicker24hr();
    const data = Array.isArray(response) ? response : [response];

    const topTickets = this.getTopTickers(data, ['USDT', 'BTC', 'ETH']);

    this._market.update(prev => ({
      ...prev,
      tickers: topTickets,
    }));
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

  filterByQuote(query: string[]): ReturnType<Market['sortByQuery']> {
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
}
