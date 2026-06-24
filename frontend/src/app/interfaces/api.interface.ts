import { Order } from '@interfaces/order-book.interface';

export type ResponseKlineTypes = (string & number & boolean)[];

export type ResponseOrderBook = Order;
export interface OrderResponse {
  symbol: string;
  orderId: number;
  orderListId: string; // Unless it's part of an order list, value will be -1
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  origQuoteOrderQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  workingTime: string;
  selfTradePreventionMode: string;
}
