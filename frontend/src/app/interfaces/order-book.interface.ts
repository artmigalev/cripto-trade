import { OrderBookColumns, OrderBookRows } from '@enums/order-book.enum';

export interface OrderBook {
  orders: Order | null;
  columns: OrderBookColumns;
  rows: OrderBookRows;
}

export interface Order {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

export interface OrderStream {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  U: number; // First update ID in event
  u: number; // Final update ID in event
  b: Order['bids'];
  a: Order['asks'];
}
