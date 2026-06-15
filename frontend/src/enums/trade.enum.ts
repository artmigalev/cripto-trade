export enum Trade {
  PATH_KLINES = '/v3/klines', //Initial candle history loaded via REST API
}
export enum CandleIntervals {
  '1s' = '1s',
  '1m' = '1m',
  '5m' = '5m',
  '15m' = '15m',
  '1h' = '1h',
  '1d' = '1d',
}

export enum ErrorChart {
  NOT_FOUNT_DATA = 'Data not found',
  EMPTY_DATA = 'Empty klines data',
  BAD_RESPONSE = 'Bad response from server',
}
export enum TradeStreams {
  Candlestick = '@kline_',
}
