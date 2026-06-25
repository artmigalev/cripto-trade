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
