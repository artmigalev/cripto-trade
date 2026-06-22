import { AppError } from '@/app/core/handlers/errors/app.error.handler';
import { Injectable } from '@angular/core';
import { StreamKline } from '@interfaces/chart.interface';
import { OrderStream } from '@interfaces/order-book.interface';
import { TickerStreamsPayload } from '@interfaces/ticker.interfaсe';
import { Subject } from 'rxjs';

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
  private socket: WebSocket | null = null;
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

  async connect(stream: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.socket = new WebSocket(
        `wss://stream.testnet.binance.vision/ws/${stream}`
      );
      this.socket.onopen = () => {
        this.subscribe();

        resolve();
      };
      this.socket.onerror = () => console.log('error');
      this.socket.onclose = () => console.log('close');
    });
  }
  unsubscribeStream(streamName: StreamName) {
    if (this.socket) {
      const streamMessage: RequestStream = {
        method: 'UNSUBSCRIBE',
        params: [streamName],
        id: this.streamId++,
      };
      this.send(streamMessage);
    } else {
      throw new AppError('Socked close', '404', 'SOCKET');
    }
  }
  subscribeStream(streamName: StreamName) {
    if (this.socket) {
      const streamMessage: RequestStream = {
        method: 'SUBSCRIBE',
        params: [streamName],
        id: this.streamId++,
      };
      this.send(streamMessage);
    } else {
      throw new AppError('Socked close', '404', 'SOCKET');
    }
  }
  subscribe() {
    if (this.socket)
      this.socket.onmessage = event => {
        const dataParse = JSON.parse(event.data);
        if (Array.isArray(dataParse)) {
          const eventType = dataParse[0].e;
          if (eventType === '24hrMiniTicker') {
            this.tickerSubject.next(dataParse);
            console.log('24hrMiniTicker');
          }
        } else {
          const eventType = dataParse.e;
          if (eventType === 'kline') {
            this.klineSubject.next(dataParse);
          }
        }
      };
  }

  private send(payload: RequestStream) {
    this.socket?.send(JSON.stringify(payload));
  }

  disconnect() {
    this.socket?.close();
  }
}
// Data is loaded from Binance Testnet API. Card prices update in real time via WebSocket !ticker@arr.
