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

  getStatus(): Signal<boolean> {
    return computed(() => this.status());
  }

  getTicker24hr = async (
    query?: string | string[]
  ): Promise<Ticker24hrResponse | Ticker24hrResponse[]> => {
    if (query) {
      if (Array.isArray(query)) {
        const parseToJson = JSON.stringify(query);

        return firstValueFrom(
          this.http.get<Ticker24hrResponse | Ticker24hrResponse[]>(
            `/api/v3/ticker/24hr?symbol=${parseToJson}`
          )
        );
      } else {
        return firstValueFrom(
          this.http.get<Ticker24hrResponse>(`/api/v3/ticker/24hr?symbol=${query}`)
        );
      }
    }

    return firstValueFrom(
      this.http.get<Ticker24hrResponse | Ticker24hrResponse[]>('/api/v3/ticker/24hr')
    );
  };
}
