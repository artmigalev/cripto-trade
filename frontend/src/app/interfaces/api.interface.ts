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

export interface BinanceAccountInfResponse {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  commissionRates: CommissionRates;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  brokered: boolean;
  requireSelfTradePrevention: boolean;
  preventSor: boolean;
  updateTime: number;
  accountType: string;
  balances: Balance[];
  permissions: string[];
  uid: number;
}

export interface Balance {
  asset: string;
  free: string;
  locked: string;
}

interface CommissionRates {
  maker: string;
  taker: string;
  buyer: string;
  seller: string;
}

export interface Params {
  ticker: {
    symbol?: string;
    symbolStatus?: SymbolStatusType;
    synbols?: string[];
  };
}
type SymbolStatusType = 'TRADING' | 'HALT' | 'BREAK';
