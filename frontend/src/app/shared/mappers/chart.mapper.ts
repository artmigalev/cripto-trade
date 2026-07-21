import { ResponseKlineTypes } from '@interfaces/api.interface';
import { BinanceStreamKline, StreamKline } from '@interfaces/chart.interface';
import { OhlcData, UTCTimestamp } from 'lightweight-charts';

export const mapCandle = (k: ResponseKlineTypes): StreamKline =>
  ({
    t: k[0], // openTime
    o: k[1], // open
    h: k[2], // high
    l: k[3], // low
    c: k[4], // close
    v: k[5], // volume
  }) satisfies StreamKline;

export const mapStreamKline = (streamKline: StreamKline): OhlcData => {
  return {
    time: (streamKline.t / 1000) as UTCTimestamp,
    open: Number(streamKline.o),
    high: Number(streamKline.h),
    low: Number(streamKline.l),
    close: Number(streamKline.c),
  };
};

export const mapperBinanceStreamKline = (
  binanceKline: BinanceStreamKline
): StreamKline => ({
  t: binanceKline.k.t, // openTime
  o: binanceKline.k.o, // open
  h: binanceKline.k.h, // high
  l: binanceKline.k.l, // low
  c: binanceKline.k.c, // close
  v: Number(binanceKline.k.v), // volume
});
