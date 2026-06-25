import { BinanceAccountInfResponse } from '@interfaces/api.interface';

export interface Portfolio {
  state: {
    assetTableData: BinanceAccountInfResponse['balances'];
    value: number | null;
  };
}
