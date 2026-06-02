import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-markets-table',
  imports: [],
  templateUrl: './markets-table.component.html',
  styleUrl: './markets-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsTableComponent {}
// Display a table of all available trading pairs fetched from Binance Testnet API.
// Columns: Pair, Price, 24h Change (%), 24h Volume.
// Table data updates in real time via WebSocket (!ticker@arr) without page reload.
// Rows are clickable — clicking a pair navigates to the Trade page for that pair.
