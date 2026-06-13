


export interface OrderResponse{
    "symbol":string
    "orderId":number
    "orderListId":string // Unless it's part of an order list, value will be -1
    "clientOrderId":string
    "transactTime":number
    "price":string
    "origQty":string
    "executedQty":string
    "origQuoteOrderQty":string
    "cummulativeQuoteQty":string
    "status":string
    "timeInForce":string
    "type":string
    "side":string
    "workingTime":string
    "selfTradePreventionMode":string
}

// {
//     "symbol": "BTCUSDT
//     "orderId": 28,
//     "orderListId": -1, // Unless it's part of an order list, value will be -1
//     "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
//     "transactTime": 1507725176595,
//     "price": "0.00000000",
//     "origQty": "10.00000000",
//     "executedQty": "10.00000000",
//     "origQuoteOrderQty": "0.000000",
//     "cummulativeQuoteQty": "10.00000000",
//     "status": "FILLED",
//     "timeInForce": "GTC",
//     "type": "MARKET",
//     "side": "SELL",
//     "workingTime": 1507725176595,
//     "selfTradePreventionMode": "NONE"
// }