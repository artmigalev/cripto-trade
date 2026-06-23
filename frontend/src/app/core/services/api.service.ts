import { API_CONFIG } from '@services/tokens/api-config.tokens';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Ticker } from '@interfaces/ticker.interfaсe';
import { firstValueFrom } from 'rxjs';
import { ResponseKlineTypes } from '@interfaces/api.interface';
import { CandleIntervals, ErrorChart, Trade } from '@enums/trade.enum';
import { AppError } from '@/app/core/handlers/errors/app.error.handler';

export type Ticker24hrResponse = Ticker;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);
  private readonly status = signal(true);

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
            `${this.config.baseUrl}/v3/ticker/24hr?symbol=${parseToJson}`
          )
        );
      } else {
        return firstValueFrom(
          this.http.get<Ticker24hrResponse>(
            `${this.config.baseUrl}/v3/ticker/24hr?symbol=${query}`
          )
        );
      }
    }

    return firstValueFrom(
      this.http.get<Ticker24hrResponse | Ticker24hrResponse[]>(
        `${this.config.baseUrl}/v3/ticker/24hr`
      )
    );
  };
  async getKlines(
    symbol = 'BTCUSDT',
    interval: CandleIntervals = CandleIntervals['1d'],
    limit: 100
  ): Promise<ResponseKlineTypes[]> {
    try {
      return await firstValueFrom(
        this.http.get<ResponseKlineTypes>(
          `${this.config.baseUrl}${Trade.PATH_KLINES}`,
          {
            params: {
              symbol,
              interval,
              limit: String(limit),
            },
          }
        )
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(ErrorChart.BAD_RESPONSE, '500', 'API');
      }
      throw new AppError(ErrorChart.BAD_RESPONSE, '500', 'API');
    }
  }
}
