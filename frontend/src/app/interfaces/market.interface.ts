import { Ticker } from '@interfaces/ticker.interfaсe';

export interface Market {
  state: {
    tickers: Ticker[];
  };
}
