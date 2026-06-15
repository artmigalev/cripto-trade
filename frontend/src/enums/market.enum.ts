export enum MarketTable {
  'Pair' = 'symbol',
  'Price' = 'lastPrice',
  'Change24h' = 'priceChangePercent',
  'Volume' = 'volume',
}
export enum MarketTableColumns {
  'Pair' = 'Pair',
  'Price' = 'Price',
  'Change24h' = '24h Change (%)',
  'Volume' = '24h Volume',
}

export enum MarketTabs {
  'ALL' = 'ALL',
  'USDT' = 'USDT',
  'BTC' = 'BTC',
  'ETH' = 'ETH',
}
export enum MarketStreams {
  TICKERS = '!miniTicker@arr',
}
