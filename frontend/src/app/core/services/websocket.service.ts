import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null = null;

  async connect<T>(stream: string, subject: Subject<T>): Promise<void> {
    return new Promise<void>(resolve => {
      this.socket = new WebSocket(
        `wss://stream.testnet.binance.vision/ws/${stream}`
      );
      this.socket.onopen = () => {
        this.subscribe(subject);

        resolve();
      };
      this.socket.onerror = () => console.log('error');
      this.socket.onclose = () => console.log('close');
    });
  }
  subscribe<T>(subject: Subject<T>) {
    if (this.socket)
      this.socket.onmessage = event => {
        subject.next(JSON.parse(event.data));
      };
  }

  disconnect() {
    this.socket?.close();
  }
}
// Data is loaded from Binance Testnet API. Card prices update in real time via WebSocket !ticker@arr.
