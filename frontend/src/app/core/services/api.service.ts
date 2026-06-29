import { API_CONFIG } from '@services/tokens/api-config.tokens';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Ticker } from '@interfaces/ticker.interfaсe';
import { firstValueFrom } from 'rxjs';
import {
  BinanceAccountInfResponse,
  OrderResponse,
  ResponseKlineTypes,
} from '@interfaces/api.interface';
import { CandleIntervals, ErrorChart, Trade } from '@enums/trade.enum';
import { AppError } from '@/app/core/handlers/errors/app.error.handler';
import { OrderBook } from '@enums/order-book.enum';
import { Order } from '@interfaces/order-book.interface';
import { OrderFormParameters } from '@interfaces/order-form.interface';

export type Ticker24hrResponse = Ticker;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);
  private readonly status = signal(true);
  private paths = {
    orders: OrderBook['PATH'],
  };

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
  async getOrder(symbol: string): Promise<Order> {
    try {
      return await firstValueFrom(
        this.http.get<Order>(
          `${this.config.baseUrl}${this.paths.orders}?symbol=${symbol}`
        )
      );
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(ErrorChart.BAD_RESPONSE, '500', 'API');
      }
      throw new AppError(ErrorChart.BAD_RESPONSE, '500', 'API');
    }
  }

  async sendOrder(payload: OrderFormParameters): Promise<OrderResponse> {
    try {
      return await firstValueFrom(
        this.http.post<OrderResponse>(
          `${this.config.backendUrl}/trade/create-order`,
          payload
        )
      );
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        throw new AppError(ErrorChart.BAD_RESPONSE, '500', 'API');
      }
      throw new AppError('Unknown error', '500', 'UNKNOWN');
    }
  }

  async getAccountInf(): Promise<BinanceAccountInfResponse['balances']> {
    try {
      return await firstValueFrom(
        this.http.get<BinanceAccountInfResponse['balances']>(
          `${this.config.backendUrl}/portfolio/account`
        )
      );
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        throw new AppError(ErrorChart.BAD_RESPONSE, '500', 'API');
      }
      throw new AppError('not found balances', '500', 'ApiService');
    }
  }
}
