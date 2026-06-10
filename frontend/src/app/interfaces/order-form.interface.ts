import {
  ErrorOrderFormMsg,
  OrderFormFields,
  OrderFormValues,
} from '@enums/order-form.enum';

export interface OrderForm {
  fields: OrderFormFields;

  errorsOrderForm: ErrorOrderForm[];
}

export interface ErrorOrderForm {
  type: ErrorTypesOrderForm;
  massage: ErrorOrderFormMsg;
}

export type ErrorTypesOrderForm =
  | 'main'
  | 'required'
  | 'amount_Exceeds'
  | 'amount_Available';

export interface OrderFormParameters {
  symbol: string;
  side: OrderFormValues.BUY | OrderFormValues.SELL;
  type: OrderType;
  timeInForce: TimeInForce;
  price: number;
  quantity: number;
}



export type TimeInForce = 'GTC' | 'IOC' | 'FOK';

export type OrderType =
  | 'LIMIT'
  | 'MARKET'
  | 'STOP_LOSS'
  | 'STOP_LOSS_LIMIT'
  | 'TAKE_PROFIT'
  | 'TAKE_PROFIT_LIMIT'
  | 'LIMIT_MAKER';
