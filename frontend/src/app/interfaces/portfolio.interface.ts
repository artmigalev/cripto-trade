import { Balance } from '@interfaces/api.interface';

export interface Portfolio {
  state: {
    assetTableData: DataTable[];
    value: number | null;
  };
}

export type DataTable = Balance & { currentPrice: number; totalValue: number };
export interface OrderHistory {
  time: number;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  preventedQuantity: string;
  price: string;
  status: string;
}
type OrderSide = 'Buy' | 'Sell';

type OrderType = 'Market' | 'Limit';
