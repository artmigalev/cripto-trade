import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  MatHeaderCellDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import { ContentLoaderModule } from '@ngneat/content-loader';
export interface PeriodicElement {
  name: string;
  symbol: string;
  quantity: number;
  value: number; //current value
}

const mockDataTable: PeriodicElement[] = [
  { name: 'BTC', quantity: 1.0079, symbol: 'H', value: 100 },
  { name: 'USDT', quantity: 1.0079, symbol: 'H', value: 100 },
  { name: 'EIFR', quantity: 1.0079, symbol: 'H', value: 100 },
]; //mockDataTable

@Component({
  selector: 'app-portfolio-summary',
  imports: [MatTable, MatTableModule, ContentLoaderModule, MatHeaderCellDef],
  templateUrl: './portfolio-summary.component.html',
  styleUrl: './portfolio-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSummaryComponent {
  totalPortfolioValue = input<string>();
  displayedColumns: string[] = ['name', 'quantity', 'symbol', 'value'];
  protected dataSource = mockDataTable;
}

// Portfolio Summary
// Display the total portfolio value in USD.
// The value recalculates automatically when prices change.
// Show a brief table: 3–5 main assets with their quantity and current value.
//
