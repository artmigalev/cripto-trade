// trade.service.ts
import {
  Injectable,
  effect,
  inject,
  DestroyRef,
  computed,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WebsocketService } from './websocket.service';
import { CandleIntervals, ErrorChart, TradeStreams } from '@enums/trade.enum';
import { ResponseKlineTypes } from '@interfaces/api.interface';
import { StreamKline } from '@interfaces/chart.interface';
import { Order } from '@interfaces/order-book.interface';
import { Trade } from '@interfaces/trade.interface';
import { ApiService } from '@services/api.service';
import { mapCandle } from '@/app/shared/mappers/chart.mapper';
import { AppError } from '@/app/core/handlers/errors/app.error.handler';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private readonly webSocketService = inject(WebsocketService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly apiService = inject(ApiService);

  private readonly _state = signal<Trade['_state']>({
    chart: {
      historyCandles: [],
      lastRealtimeCandle: null,
      activeCandleInterval: CandleIntervals['1m'],
      chartSymbol: 'BTCUSDT',
    },
    orderBook: null,
  });
  private previousStream: string | null = null;

  chartSymbol = computed(() => this._state().chart.chartSymbol);
  activeInterval = computed(() => this._state().chart.activeCandleInterval);
  stateKlines = computed(() => this._state().chart.historyCandles);
  lastCandle = computed(() => this._state().chart.lastRealtimeCandle);
  state = this._state.asReadonly();

  constructor() {
    effect(() => {
      const symbol = this.chartSymbol();
      const interval = this.activeInterval();
      this.loadKlineHistory(symbol, interval);

      const streamName = `${symbol.toLowerCase()}${TradeStreams.Candlestick}${interval}`;
      if (this.previousStream) {
        this.webSocketService.unsubscribeStream(this.previousStream);
      }
      console.log('streamName', streamName);
      this.previousStream = streamName;
      this.webSocketService.subscribeStream(streamName);
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
  setOrderState(snapshot: Order) {
    this._state.update(state => ({
      ...state,
      orderBook: snapshot,
    }));
  }
  updateKlineStream() {
    this.webSocketService.historyCandles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (kline: StreamKline) => {
          const currentCandles = this.stateKlines();

          const includesKline = currentCandles.some(
            stateKline => stateKline['t'] === kline['t']
          );

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

    // Подписка на order book stream
    this.webSocketService.orderSubject$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: depth => {
          const order = {
            lastUpdateId: depth['u'],
            bids: depth['b'],
            asks: depth.a,
          } satisfies Order;

          this.setOrderState(order);
        },
      });
  }
  async loadKlineHistory(
    symbol: string,
    interval: CandleIntervals
  ): Promise<void> {
    try {
      this.clearHistoryCandles();
      const rawKlines = await this.apiService.getKlines(symbol, interval, 100);
      const chartData = rawKlines.map(h => mapCandle(h));
      this.updateChartHistory(chartData);
    } catch (error: unknown) {
      console.error(error);
      throw new AppError(ErrorChart['NOT_FOUNT_DATA'], '404', 'TradeService');
    }
  }
  clearHistoryCandles(): void {
    this._state.update(state => ({
      ...state,
      chart: {
        ...state.chart,
        historyCandles: [],
        lastRealtimeCandle: null,
      },
    }));
  }
  setSymbol(symbol: string): void {
    this._state.update(prev => ({
      ...prev,
      chart: { ...prev.chart, chartSymbol: symbol },
    }));
  }

  setInterval(interval: CandleIntervals): void {
    this._state.update(state => ({
      ...state,
      chart: { ...state.chart, activeCandleInterval: interval },
    }));
  }

  updateRealtimeCandle(candle: StreamKline): void {
    const newKlines = this.stateKlines().map(stateKline => {
      return stateKline['t'] === candle['t']
        ? { ...stateKline, ...candle }
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

  setOrderState(snapshot: Order): void {
    this._state.update(state => ({
      ...state,
      orderBook: snapshot,
    }));
  }

  updateChartHistory(state: Trade['_state']['chart']['historyCandles']) {
    this._state.update(prev => ({
      ...prev,
      chart: { ...prev.chart, historyCandles: state },
    }));
  }

  createdStreamName(): string {
    return `${this.chartSymbol().toLowerCase()}${TradeStreams.Candlestick}${this.activeInterval()}`;
  }
}
