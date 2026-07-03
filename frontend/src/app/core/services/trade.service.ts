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
import { StreamKline } from '@interfaces/chart.interface';
import {
  BookLevel,
  Order,
  OrderStream,
} from '@interfaces/order-book.interface';
import { Trade } from '@interfaces/trade.interface';
import { ApiService } from '@services/api.service';
import { mapCandle } from '@/app/shared/mappers/chart.mapper';
import { AppError } from '@/app/core/handlers/errors/app.error.handler';
import { OrderFormParameters } from '@interfaces/order-form.interface';
import { OrderResponse } from '@interfaces/api.interface';

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

  chartSymbol = computed(() => this.state().chart.chartSymbol);
  activeInterval = computed(() => this.state().chart.activeCandleInterval);
  stateKlines = computed(() => this.state().chart.historyCandles);
  lastCandle = computed(() => this.state().chart.lastRealtimeCandle);
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
      this.webSocketService.subscribeStream(streamName);
    });

    // Подписка на kline stream с автоматическим отключением
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
          this.applyDepthEvent(depth);
        },
      });
  }
  async placeOrder(order: OrderFormParameters): Promise<OrderResponse> {
    const payload = {
      ...order,
      timestamp: Date.now().toString(),
    };
    return await this.apiService.sendOrder(payload);
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

  applyLevel(side: BookLevel[], [price, quantity]: BookLevel, isAsk: boolean) {
    const idx = side.findIndex(([p]) => p === price);

    if (Number(quantity) === 0) {
      if (idx !== -1) side.splice(idx, 1);
      return;
    }

    if (idx !== -1) {
      side[idx] = [price, quantity];
    } else {
      side.push([price, quantity]);
    }

    side.sort((a, b) =>
      isAsk ? Number(a[0]) - Number(b[0]) : Number(b[0]) - Number(a[0])
    );
  }
  applyDepthEvent(event: OrderStream) {
    const orderBook = this.state().orderBook!;

    for (const bid of event.b) {
      this.applyLevel(orderBook.bids, bid, false);
    }

    for (const ask of event.a) {
      this.applyLevel(orderBook.asks, ask, true);
    }

    orderBook.lastUpdateId = event.E;

    this.setOrderState(orderBook);
  }
}
