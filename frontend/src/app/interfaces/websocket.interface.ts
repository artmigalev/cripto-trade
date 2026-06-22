import { StreamKline } from '@interfaces/chart.interface';
import { OrderStream } from '@interfaces/order-book.interface';
import { TickerStreamsPayload } from '@interfaces/ticker.interfaсe';

// export interface Websocket {}

export type BinanceWsMessage =
  | TickerStreamsPayload[]
  | StreamKline
  | OrderStream;
