import { mapCandle } from '@/app/shared/mappers/chart.mapper';
import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '@services/api.service';
import { TradeService } from '@services/trade.service';
import { WebsocketService } from '@services/websocket.service';

export const klinesResolver: ResolveFn<void> = async (
  route: ActivatedRouteSnapshot
) => {
  const apiService = inject(ApiService);
  const tradeService = inject(TradeService);
  const websocketService = inject(WebsocketService);
  const symbol = route.paramMap.get('symbol')!;

  const klines = await apiService.getKlines(symbol);
  const order = await apiService.getOrder(symbol);
  tradeService.setSymbol(symbol);
  tradeService.setOrderState(order);

  if (klines) {
    console.log(klines, 'load kline ');
    const chartData = klines.map(h => mapCandle(h));
    tradeService.updateChartHistory(chartData);
    websocketService.subscribeStream(tradeService.createdStreamName());
  }
};
