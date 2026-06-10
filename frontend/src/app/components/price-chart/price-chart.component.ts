import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-price-chart',
  imports: [],
  templateUrl: './price-chart.component.html',
  styleUrl: './price-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceChartComponent {}
