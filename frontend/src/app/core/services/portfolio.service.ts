import { Injectable, signal } from '@angular/core';
import { Balance, BinanceAccountInfResponse } from '@interfaces/api.interface';
import { Portfolio } from '@interfaces/portfolio.interface';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private _state = signal<Portfolio['state'] | null>(null);

  state = this._state.asReadonly();

  setPortfolio<T extends BinanceAccountInfResponse>(data: T) {
    const { balances } = data;

    const filteredBalances = this.filteredAssetsNotNull<Balance>(balances);

    this._state.set({
      assetTableData: filteredBalances,
      value: null,
    });
  }
  filteredAssetsNotNull<T extends Balance>(balances: T[]) {
    return balances.filter(
      asset => asset.free !== '0.00000000' || asset.locked !== '0.00000000'
    );
  }
}
