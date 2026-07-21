import { BinanceStreamKline } from '@interfaces/chart.interface';
import { OrderStream } from '@interfaces/order-book.interface';
import { TickerStreamsPayload } from '@interfaces/ticker.interfaсe';

export type BinanceWsMessage =
  TickerStreamsPayload[] | BinanceStreamKline | OrderStream;
