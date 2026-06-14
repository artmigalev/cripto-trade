import { mapCandle } from '@/app/shared/mappers/chart.mapper';
import { Injectable, signal } from '@angular/core';
import { CandleIntervals, ErrorChart } from '@enums/trade.enum';
import { ResponseKlineTypes } from '@interfaces/api.interface';
import { Trade } from '@interfaces/trade.interface';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private readonly _state = signal<Trade['_state']>({
    chart: {
      klines: [],
      candleIntervals: [],
      activeCandleInterval: CandleIntervals['1m'],
    },
    orderBook: [],
  });
  errors = signal<Trade['errors']>([]);

  state = this._state.asReadonly();

  updateKlines(klines: ResponseKlineTypes[]) {
    if (klines.length === 0) {
      this.errors.update(state => [
        ...state,
        { type: 'chartError', message: ErrorChart.EMPTY_DATA },
      ]);
      return;
    }
    const mapperKlines = klines.map(kline => mapCandle(kline));

    this._state.update(state => ({
      ...state,
      chart: { ...state.chart, klines: mapperKlines },
    }));
  }
}
