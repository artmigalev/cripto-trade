import { ErrorChard } from '@enums/trade.enum';
import { Chart } from '@interfaces/chart.interface';
import { OrderBook } from '@interfaces/order-book.interface';

export type ResponseKlineTypes = [(string & number)[]];

export interface Trade {
  _state: {
    chart: Chart;
    orderBook: OrderBook['orders'];
  };
  errors: ErrorTrade[];
}

export type TradeErrorType = 'chartError' | 'orderBook' | 'orderForm';

export interface ErrorTrade {
  type: TradeErrorType;
  massage: ErrorChard;
}
