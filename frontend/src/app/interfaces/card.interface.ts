import { Ticker } from '@interfaces/ticker.interfaсe';

export interface Card {
  symbol: Ticker['symbol'];
  currentPrice: Ticker['lastPrice'];
  change24h: Ticker['priceChangePercent'];
  volume: Ticker['volume'];
}
