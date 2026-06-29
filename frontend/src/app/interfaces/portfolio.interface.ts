import { Balance } from '@interfaces/api.interface';

export interface Portfolio {
  state: {
    assetTableData: DataTable[];
    value: number | null;
  };
}

export type DataTable = Balance & { currentPrice: number; totalValue: number };
