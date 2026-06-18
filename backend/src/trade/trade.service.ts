import { HMACService } from '@/src/hmac/hmac.service';
import { OrderResponse } from '@interfaces/trade.interface';
import { KeyService } from '@keys/key.service';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class TradeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly hmacService: HMACService,
    private readonly serviceKey: KeyService
  ) {}

  async sendOrder(
    dataOrder: Record<string, string>,
    userId: string
  ): Promise<OrderResponse> {
    const queryString = this.getQueryString({
      ...dataOrder,
      timestamp: Date.now(),
    });
    const apiKey = this.serviceKey.getKey(userId)?.apiKey;

    const signature = await this.hmacService.sign(userId, queryString);
    const { data } = await firstValueFrom(
      this.httpService
        .post<OrderResponse>(
          `https://testnet.binance.vision/api/v3/order?${queryString}&signature=${signature}`,
          null,
          {
            headers: {
              'X-MBX-APIKEY': apiKey,
            },
          }
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(
              error.response?.data || 'An error happened!'
            );
          })
        )
    );
    return data;
  }

  getQueryString(dataOrder: Record<string, string | number>): string {
    return new URLSearchParams(
      Object.entries(dataOrder).map(([k, v]) => [k, String(v)])
    ).toString();
  }
}
