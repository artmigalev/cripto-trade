import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '@services/api.service';
import { TradeService } from '@services/trade.service';

export const klinesResolver: ResolveFn<void> = async (
  route: ActivatedRouteSnapshot
) => {
  const apiService = inject(ApiService);
  const tradeService = inject(TradeService);

  const symbol = route.paramMap.get('symbol')!;
  tradeService.setSymbol(symbol);
  const klines = await apiService.getKlines(symbol);

  if (klines) {
    tradeService.updateKlines(klines);

    await tradeService.createdStream();
  }
};
