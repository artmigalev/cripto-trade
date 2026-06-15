import { ResponseKlineTypes } from '@interfaces/api.interface';
import { StreamKline } from '@interfaces/chart.interface';
import { OhlcData, UTCTimestamp } from 'lightweight-charts';

export const mapCandle = (candle: ResponseKlineTypes): OhlcData =>
  ({
    time: (candle[0] / 1000) as UTCTimestamp,
    open: Number(candle[1]),
    high: Number(candle[2]),
    low: Number(candle[3]),
    close: Number(candle[4]),
  }) satisfies OhlcData;

export const mapStreamKline = (streamKline: StreamKline): OhlcData => {
  const { k } = streamKline;

  return {
    time: (k.t / 1000) as UTCTimestamp,
    open: Number(k.o),
    high: Number(k.h),
    low: Number(k.l),
    close: Number(k.c),
  };
};
