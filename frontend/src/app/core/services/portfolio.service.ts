import { assetTableMapper } from '@/app/shared/mappers/asset-table.mapper';
import { computed, inject, Injectable, signal } from '@angular/core';
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

  portfolioValueUSD = computed(() => {
    return this._state()?.assetTableData.reduce((total, asset) => {
      return total + asset.currentPrice;
    }, 0);
  });

  setPortfolio<T extends Balance>(data: T[]) {
    const priceValue = 'USDT';

    const tickers = this.marketService.market().tickers[priceValue];

    this._state.update(prev => ({
      ...prev,
      assetTableData: assetTableMapper(data, tickers),
      value: null,
    }));
  }
}
