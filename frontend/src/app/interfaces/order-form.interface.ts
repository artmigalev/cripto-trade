import {
  ErrorOrderFormMsg,
  OrderFormFields,
  OrderSide,
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
  side: OrderSide;
  type: OrderType;
  timeInForce: TimeInForce;
  price: number;
  quantity: number;
  timestamp: string;
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
