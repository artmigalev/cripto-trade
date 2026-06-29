import { Balance } from '@interfaces/api.interface';
import { DataTable } from '@interfaces/portfolio.interface';
import { TickerMarketType } from '@interfaces/ticker.interfaсe';

export const assetTableMapper = (
  balances: Balance[],
  tickers: TickerMarketType[]
): DataTable[] => {
  const currentTickers = tickers.filter(ticker =>
    balances.some(balance => ticker.symbol === `${balance.asset}USDT`)
  );
  const tickerMap = new Map(
    currentTickers.map(t => [t.symbol, Number(t.lastPrice)])
  );

  return balances.map(balance => {
    const price = tickerMap.get(`${balance.asset}USDT`) ?? 0;

    return {
      asset: balance.asset,
      free: balance.free,
      locked: balance.locked,
      currentPrice: price,
      totalValue: (Number(balance.free) + Number(balance.locked)) * price,
    } satisfies DataTable;
  });
};
