import { assetTableMapper } from '@/app/shared/mappers/asset-table.mapper';
import { inject, Injectable, signal } from '@angular/core';
import { DefaultPrice } from '@components/asset-table/asset-table.component';
import { Balance } from '@interfaces/api.interface';
import { Portfolio } from '@interfaces/portfolio.interface';
import { MarketService } from '@services/market.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private readonly marketService = inject(MarketService);
  private _state = signal<Portfolio['state'] | null>(null);

  state = this._state.asReadonly();

  setPortfolio<T extends Balance>(data: T[]) {
    const priceValue = DefaultPrice['USDT'];

    const tickers = this.marketService.market().tickers[priceValue];

    this._state.update(prev => ({
      ...prev,
      assetTableData: assetTableMapper(data, tickers),
      value: null,
    }));
  }
}
