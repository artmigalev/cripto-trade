import { mapCandle, mapStreamKline } from '@/app/shared/mappers/chart.mapper';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CandleIntervals, ErrorChart, TradeStreams } from '@enums/trade.enum';
import { ResponseKlineTypes } from '@interfaces/api.interface';
import { StreamKline } from '@interfaces/chart.interface';
import { Trade } from '@interfaces/trade.interface';
import { WebsocketService } from '@services/websocket.service';
import { OhlcData } from 'lightweight-charts';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private readonly webSocketService = inject(WebsocketService);
  private readonly _state = signal<Trade['_state']>({
    chart: {
      historyCandles: [],
      lastRealtimeCandle: null,
      activeCandleInterval: CandleIntervals['1m'],
      chartSymbol: 'BTCUSDT',
    },
    orderBook: [],
  });
  private subjectKline = new Subject<StreamKline>();
  private destroyRef = inject(DestroyRef);

  historyCandles$ = this.subjectKline.asObservable();

  activeInterval = computed(() => this._state().chart.activeCandleInterval);
  chartSymbol = computed(() => this._state().chart.chartSymbol);
  stateKlines = computed(() => this._state().chart.historyCandles);

  errors = signal<Trade['errors']>([]);

  state = this._state.asReadonly();

  constructor() {
    const symbol = this.chartSymbol();
    const interval = this.activeInterval();

    effect(async () => {
      if (symbol) {
        await this.createdStream();
      }
    });
    effect(async () => {
      if (interval) {
        await this.createdStream();
      }
    });
  }

  setSymbol(symbol: string) {
    this._state.update(prev => ({
      ...prev,
      chart: { ...prev.chart, chartSymbol: symbol },
    }));
  }

  setInterval(interval: CandleIntervals) {
    this._state.update(state => ({
      ...state,
      chart: { ...state.chart, activeCandleInterval: interval },
    }));
  }

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

  async createdStream() {
    this.webSocketService.disconnect();
    const streamName = `${this.chartSymbol().toLowerCase()}${TradeStreams.Candlestick}${this.activeInterval()}`;
    await this.webSocketService.connect<StreamKline>(
      streamName,
      this.subjectKline
    );
    this.updateKlineStream();
  }

  updateRealtimeCandle(candle: OhlcData) {
    const newKlines = this.stateKlines().map(stateKline => {
      return stateKline['time'] === String(candle.time)
        ? {
            ...stateKline,
            ...candle,
          }
        : stateKline;
    });

    this._state.update(state => ({
      ...state,
      chart: {
        ...state.chart,
        historyCandles: newKlines,
        lastRealtimeCandle: candle,
      },
    }));
  }

  updateKlineStream() {
    this.historyCandles$
      .pipe(map(mapStreamKline), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (kline: OhlcData) => {
          const includesKline = this.stateKlines().some(stateKline => {
            return stateKline['time'] === kline.time;
          });

          if (!includesKline) {
            this._state.update(state => ({
              ...state,
              chart: {
                ...state.chart,
                historyCandles: [...state.chart.historyCandles, kline],
                lastRealtimeCandle: kline,
              },
            }));
          } else {
            this.updateRealtimeCandle(kline);
          }
        },
      });
  }
}
