export enum OrderForm {
  TITLE = 'A form for placing a trade order ',
  PATH = '/v3/order', //POST /api/v3/order)
}
export enum OrderFormFields {
  Side = 'Side', //'Buy / Sell',

  Order_Type = 'Order Type', //Market / Limit.
  Amount = 'Amount',
  Price = 'Price', // displayed only for Limit orders.
}
export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
  LIMIT_MAKER = 'LIMIT_MAKER',
}
export enum OrderSide {
  Buy = 'BUY',
  Sell = 'SELL',
}

export enum ErrorOrderFormMsg {
  InvalidKeys = 'Invalid keys',

  Required = 'Required field',
  Amount_Exceeds = 'Amount exceeds the minimum',
  Amount_Available = 'Order total does not exceed available balance',
  // Validation: all required fields are filled, amount exceeds the minimum, order total does not exceed available balance. Clear error messages below each field on errors.
}
