import { ResponseKlineTypes } from '@interfaces/api.interface';
import { OhlcData, UTCTimestamp } from 'lightweight-charts';

export const mapCandle = (candle: ResponseKlineTypes): OhlcData =>
  ({
    time: (candle[0] / 1000) as UTCTimestamp,
    open: Number(candle[1]),
    high: Number(candle[2]),
    low: Number(candle[3]),
    close: Number(candle[4]),
  }) satisfies OhlcData;
