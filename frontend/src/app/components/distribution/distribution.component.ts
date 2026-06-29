import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { DataTable } from '@interfaces/portfolio.interface';
import { SpinnerComponent } from '@components/spinner/spinner.component';
@Component({
  selector: 'app-distribution',
  imports: [BaseChartDirective, SpinnerComponent],
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistributionComponent {
  data = input<PieChartData[]>();
  pieChartData = computed<ChartData<'pie'>>(() => {
    const assets = this.data()!;

    return {
      labels: assets.map(a => a.asset),
      datasets: [
        {
          data: assets.map(a => a.totalValue),
        },
      ],
    };
  });

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right', // 'top', 'bottom', 'left', 'right'
        align: 'center',
        labels: {
          usePointStyle: true,
          boxWidth: 12, // Уменьшить размер квадрата
          font: {
            size: 11, // Уменьшить размер текста
            family: "'Arial', sans-serif",
          },
        },
      },
    },
  };
}

export type PieChartData = Pick<DataTable, 'asset' | 'totalValue'>;
