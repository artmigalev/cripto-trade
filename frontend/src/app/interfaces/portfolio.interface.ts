import { Balance } from '@interfaces/api.interface';
import { TableTrade } from '@interfaces/trade-table.interface';

export interface Portfolio {
  state: {
    assetTableData: DataTable[];
    value: number | null;
  };
  tables: PortfolioTabelsType['tables'];
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

interface PortfolioTabelsType {
  tables: {
    orderHistory: {
      labels: TableTrade<OrderHistory>['columnsLabels'];
      displayedColumns: TableTrade<OrderHistory>['displayedColumns'];
      options: TableTrade<OrderHistory>['options'];
    };
    assets: {
      labels: TableTrade<DataTable>['columnsLabels'];
      displayedColumns: TableTrade<DataTable>['displayedColumns'];
      options: TableTrade<DataTable>['options'];
    };
  };
}

export type BriefTableItem = Pick<
  DataTable,
  'asset' | 'currentPrice' | 'totalValue'
>;
