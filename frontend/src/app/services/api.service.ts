import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type Ticker24hrResponse = Record<string, string | number>;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private status = signal(true);

  private readonly baseUrl = 'https://testnet.binance.vision/api';

  getStatus(): Signal<boolean> {
    return computed(() => this.status());
  }

  getTicker24hr = async (): Promise<
    Ticker24hrResponse | Ticker24hrResponse[]
  > => {
    return firstValueFrom(
      this.http.get<Ticker24hrResponse | Ticker24hrResponse[]>(
        this.baseUrl + '/v3/ticker/24hr',
        {},
      ),
    );
  };
}
