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

// "lastUpdateId": 1027024,
// "bids": [
//     [
//         "4.00000000",      // PRICE
//         "431.00000000"     // QTY
//     ]
// ],
// "asks": [["4.00000200", "12.00000000"]]
