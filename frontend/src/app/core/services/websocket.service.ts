import { Injectable } from '@angular/core';
import { StreamKline } from '@interfaces/chart.interface';
import { OrderStream } from '@interfaces/order-book.interface';
import { TickerStreamsPayload } from '@interfaces/ticker.interfaсe';
import { BinanceWsMessage } from '@interfaces/websocket.interface';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

type MethodStream = 'SUBSCRIBE' | 'UNSUBSCRIBE';

type StreamName = string;

interface RequestStream {
  method: MethodStream;
  params: StreamName[];
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocketSubject<unknown> | null = null;
  private tickerSubject = new Subject<TickerStreamsPayload[]>();
  private klineSubject = new Subject<StreamKline>();
  private orderSubject = new Subject<OrderStream>(); //<symbol>@depth
  streamIds = {
    tickers: '!ticker@arr',
  };
  private streamId = 0;

  tickers$ = this.tickerSubject.asObservable(); // !ticker@arr
  historyCandles$ = this.klineSubject.asObservable(); //<symbol>@kline_<interval>
  orderSubject$ = this.orderSubject.asObservable(); //<symbol>@depth

  connect(): void {
    if (this.socket) return;
    this.socket = webSocket<unknown>({
      url: 'wss://stream.testnet.binance.vision/ws',
      deserializer: e => JSON.parse(e.data as string),
      serializer: value => JSON.stringify(value),
      openObserver: {
        next: () => {
          this.streamId = 0;
        },
      },
      closeObserver: {
        next: () => {
          this.socket = null;
        },
      },
    });
    this.socket.subscribe({
      next: message => {
        this.routeMessage(message as BinanceWsMessage);
      },
      error: () => {
        this.disconnect();
      },
      complete: () => this.disconnect(),
    });
  }

  private routeMessage(message: BinanceWsMessage): void {
    if (Array.isArray(message)) {
      if (message[0]?.e === '24hrMiniTicker') {
        this.tickerSubject.next(message);
      }
      return;
    }

    if (message?.e === 'kline') {
      this.klineSubject.next(message as StreamKline);
      return;
    }

    if (message?.e === 'depthUpdate') {
      this.orderSubject.next(message as OrderStream);
    }
  }

  unsubscribeStream(streamName: StreamName) {
    if (!this.socket) return;
    this.socket.next({
      method: 'UNSUBSCRIBE',
      params: [streamName],
      id: this.streamId++,
    } satisfies RequestStream);
  }
  subscribeStream(streamName: StreamName) {
    if (!this.socket) return;

    this.socket.next({
      method: 'SUBSCRIBE',
      params: [streamName],
      id: this.streamId++,
    } satisfies RequestStream);
  }

  disconnect() {
    this.socket?.complete();
    this.socket = null;
  }
}
