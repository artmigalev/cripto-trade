import { mapCandle } from '@/app/shared/mappers/chart.mapper';
import { environment } from '@/environments/environment';
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { TradeStreams } from '@enums/trade.enum';
import { ApiService } from '@services/api.service';
import { PortfolioService } from '@services/portfolio.service';
import { TradeService } from '@services/trade.service';
import { WebsocketService } from '@services/websocket.service';

  const isByPassAuth = !environment.production && environment.devModeSkipAuth;



export const klinesResolver: ResolveFn<void> = async (
  route: ActivatedRouteSnapshot
) => {
  const apiService = inject(ApiService);
  const portfolioService = inject(PortfolioService);

  const tradeService = inject(TradeService);
  const websocketService = inject(WebsocketService);
  const symbol = route.paramMap.get('symbol')!;

  tradeService.setSymbol(symbol);
  const klines = await apiService.getKlines(
    symbol,
    tradeService.activeInterval(),
    100
  );
  if (!isByPassAuth) {

    const order = await apiService.getOrder(symbol);
    tradeService.setOrderState(order);
    if (klines) {
      const chartData = klines.map(h => mapCandle(h));
      tradeService.updateChartHistory(chartData);
      websocketService.subscribeStream(tradeService.createdStreamName());
      const streamNAme = `${symbol.toLowerCase()}${TradeStreams.OrderBook}`;

      websocketService.subscribeStream(streamNAme);
    }
    const balances = await apiService.getAccountInf();
    portfolioService.setPortfolio(balances);
  }
};
