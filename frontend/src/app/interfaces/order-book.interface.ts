import { OrderBookColumns, OrderBookRows } from '@enums/order-book.enum';

export interface OrderBook {
  orders: Order[];
  columns: OrderBookColumns;
  rows: OrderBookRows;
}

export type OrderBoolResponse = Order;

export interface Order {
  lastUpdateId: number;
  bids: [string[]];
  asks: [string[]];
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

// "lastUpdateId": 1027024,
// "bids": [
//     [
//         "4.00000000",      // PRICE
//         "431.00000000"     // QTY
//     ]
// ],
// "asks": [["4.00000200", "12.00000000"]]
