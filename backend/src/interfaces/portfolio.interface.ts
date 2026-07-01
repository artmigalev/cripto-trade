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

interface Balance {
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

export interface BinanceOrderResponse {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: OrderType;
  side: OrderSide;
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: string;
  workingTime: number;
  selfTradePreventionMode: string;
  preventedMatchId: number;
  preventedQuantity: string;
  strategyId: number;
  strategyType: number;
  trailingDelta: number;
  trailingTime: number;
  usedSor: boolean;
  workingFloor: string;
  pegPriceType: string;
  pegOffsetType: string;
  pegOffsetValue: number;
  peggedPrice: string;
  expiryReason: string;
}

export type OrderHistoryResponse = Pick<BinanceOrderResponse, 'time' | 'symbol' | 'side' | 'type' | 'preventedQuantity' | 'price' | 'status'>;
type OrderSide = 'Buy' | 'Sell';

type OrderType = 'Market' | 'Limit';