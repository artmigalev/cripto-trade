import { MarketTable, MarketTabs } from '@enums/market.enum';
import { Ticker, TickerMarketType } from '@interfaces/ticker.interfaсe';

type TickersGraf = Record<MarketTabs, TickerMarketType[]>;
export type DirectionType = 'asc' | 'desc';

export interface Market {
  state: {
    tickers: TickersGraf;
    searchValue: string;
  };
  tableState: {
    currentTab: MarketTabs;
    column: keyof typeof MarketTable;
    direction: DirectionType;
  };

  setSearch: () => void;
  sortByQuery(query: string[]): Record<string, TickerMarketType[]>;
  getTopTickers(tickets: Ticker[], query: string[]): Ticker[];
  loadedData: () => Ticker[];
}
