import { ErrorChard } from '@enums/trade.enum';
import { Chart } from '@interfaces/chart.interface';

export type ResponseKlineTypes = [(string & number)[]];

export interface Trade {
  state: {
    chart: Chart;
  };
  error: ErrorTrade[];
}

export type TradeErrorType = 'chartError' | 'orderBook' | 'orderForm';

export interface ErrorTrade {
  type: TradeErrorType;
  massage: ErrorChard;
}
