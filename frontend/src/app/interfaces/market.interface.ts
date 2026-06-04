import { Ticker } from '@interfaces/ticker.interfaсe';

export interface Market {
  state: {
    tickers: Ticker[];
    searchValue: string;
  };
  setSearch: () => void;
  sortByQuery(query: string[]): Record<string, Ticker[]>;
  getTopTickers(tickets: Ticker[], query: string[]): Ticker[];
  loadedData: () => Promise<void>;
}
