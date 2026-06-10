export enum OrderBook {
  PATH = '/v3/depth', // Initial snapshot loaded via REST AP
}

// Display the order book: separate columns for bids (buy) and asks (sell).

export enum OrderBookColumns {
  'Buy' = 'Bids',
  'Sell' = 'Asks',
}

export enum OrderBookRows {
  'Price' = 'Price',
  'Volume' = 'Volume',
}

export enum ErrorOrderBookTable {
  EMPTY = 'Empty order book data',
  BAD_RESPONSE = 'Bad order book response from server',
  NOT_FOUNT_DATA = 'Data not found',
}
