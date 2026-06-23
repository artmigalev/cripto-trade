import { CandleIntervals } from '@enums/trade.enum';

export interface Chart {
  historyCandles: StreamKline[];
  lastRealtimeCandle: StreamKline | null;
  activeCandleInterval: CandleIntervals;
  chartSymbol: string;
}

export interface StreamKline {
  t: number; // openTime
  o: string; // open
  h: string; // high
  l: string; // low
  c: string; // close
  v: number; // volume
}

export interface BinanceStreamKline {
  e: string;
  E: number;
  s: string;
  k: K;
}

interface K {
  t: number; // Kline open time
  T: number; // Kline close time
  s: string;
  i: string;
  f: number;
  L: number;
  o: string; // // Open price
  c: string; // Close price
  h: string; // High price
  l: string; // Low price

  v: string; // Base asset volume
  n: number; // Number of trades
  x: boolean;
  q: string; // Volume
  V: string; // Volume
  Q: string; // Quote asset volume
  B: string; //
}

// export type resultKline = Pick<
//   K,
//   't' | 'o' | 'h' | 'l' | 'c' | 'v' | 'T' | 'q' | 'n' | 'V' | 'Q' | 'B'
// >;

// export interface Kline {
//   openTime: number;
//   openPrice: string;
//   highPrice: string;
//   lowPrice: string;
//   closePrice: string;
//   volume: string;
//   closeTime: number;
//   quoteAssetVolume: string;
//   numberOfTrades: number;
//   takerBuyBaseAssetVolume: string;
//   takerBuyQuoteAssetVolume: string;
// }

// [
//   [
//     1499040000000, // Kline open time
//     '0.01634790', // Open price
//     '0.80000000', // High price
//     '0.01575800', // Low price
//     '0.01577100', // Close price
//     '148976.11427815', // Volume
//     1499644799999, // Kline Close time
//     '2434.19055334', // Quote asset volume
//     308, // Number of trades
//     '1756.87402397', // Taker buy base asset volume
//     '28.46694368', // Taker buy quote asset volume
//     '0', // Unused field, ignore.
//   ],
// ];
