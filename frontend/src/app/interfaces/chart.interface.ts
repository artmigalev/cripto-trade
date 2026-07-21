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
