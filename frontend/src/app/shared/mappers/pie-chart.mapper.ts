import { PieChartData } from '@components/distribution/distribution.component';
import { DataTable } from '@interfaces/portfolio.interface';

export const mapperBalanceToPieChartData = (data: DataTable): PieChartData => {
  return {
    asset: data.asset,
    totalValue: data.totalValue,
  } satisfies PieChartData;
};
