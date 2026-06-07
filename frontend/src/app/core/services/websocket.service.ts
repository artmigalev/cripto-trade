import { Injectable } from '@angular/core';
import { TickerStreamsPayload } from '@interfaces/ticker.interfaсe';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private subjectTicker = new Subject<TickerStreamsPayload>();
  tickers$ = this.subjectTicker.asObservable(); // !ticker@arr

  connect() {
    this.socket = new WebSocket('wss://stream.testnet.binance.vision/ws/!miniTicker@arr');

    this.socket.onopen = () => {
      this.subscribe();
    };
    this.socket.onerror = () => console.log('error');
    this.socket.onclose = () => console.log('close');
  }
  subscribe() {
    if (this.socket)
      this.socket.onmessage = event => {
        this.subjectTicker.next(JSON.parse(event.data));
        console.log(event.data);
      };
  }

  disconnect() {
    this.socket?.close();
  }
}
// Data is loaded from Binance Testnet API. Card prices update in real time via WebSocket !ticker@arr.
