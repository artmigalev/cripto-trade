import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BriefTableItem } from '@interfaces/portfolio.interface';
import { TableSchema } from '@interfaces/table.interface';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TableComponent } from '@components/table/table.component';
import { WidgetComponent } from '@components/widget/widget.component';
export interface PeriodicElement {
  name: string;
  symbol: string;
  quantity: number;
  value: number; //current value
}

@Component({
  selector: 'app-portfolio-summary',
  imports: [ContentLoaderModule, TableComponent, WidgetComponent],
  templateUrl: './portfolio-summary.component.html',
  styleUrl: './portfolio-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSummaryComponent {
  balance = input<number>();

  tableSchema = input.required<TableSchema<BriefTableItem>>();
}

// Portfolio Summary
// Display the total portfolio value in USD.
// The value recalculates automatically when prices change.
// Show a brief table: 3–5 main assets with their quantity and current value.
//
