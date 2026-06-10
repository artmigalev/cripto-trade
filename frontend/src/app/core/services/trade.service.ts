import { Injectable, signal } from '@angular/core';
import { CandleIntervals } from '@enums/trade.enum';
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
}
