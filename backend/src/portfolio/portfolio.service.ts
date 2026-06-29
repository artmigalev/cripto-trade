import { keys } from '@/src/constants';
import { HMACService } from '@/src/hmac/hmac.service';
import { BinanceAccountInfResponse } from '@interfaces/portfolio.interface';
import { OrderResponse } from '@interfaces/trade.interface';
import { KeyService } from '@keys/key.service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly httpService: HttpService,
    private readonly hmacService: HMACService,
    private readonly serviceKey: KeyService
  ) {}

  async getInfoByAccount(userId: string): Promise<BinanceAccountInfResponse['balances']> {
    const queryString = this.getQueryString({
      timestamp: Date.now(),
      recvWindow: 60000,
      omitZeroBalances: true,
    });
    const apiKey =   this.serviceKey.getKey(userId)?.apiKey;
    const signature = await this.hmacService.sign(userId, queryString);
    console.log(signature, 'signature');
    const { data } = await firstValueFrom(
      this.httpService
        .get<BinanceAccountInfResponse>(
          `https://testnet.binance.vision/api/v3/account?${queryString}&signature=${signature}`,
          {
            headers: {
              'X-MBX-APIKEY': apiKey,
            },
          }
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error, 'error');
            throw new BadRequestException(
              error.response?.data || 'An error happened!'
            );
          })
        )
    );
    return data.balances;
  }

  getQueryString(dataOrder: Record<string, string | number | boolean>): string {
    return new URLSearchParams(
      Object.entries(dataOrder).map(([k, v]) => [k, String(v)])
    ).toString();
  }
}
