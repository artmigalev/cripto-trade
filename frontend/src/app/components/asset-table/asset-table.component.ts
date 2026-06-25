import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Balance } from '@interfaces/api.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-asset-table',
  imports: [MatTableModule],

  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetTableComponent {
  protected readonly title = 'Asset Table';
  assets = input.required<Balance[] | null>();
  protected readonly displayedColumns = Object.values(AssetTableColumns);
  protected readonly defaultPrice = DefaultPrice['USDT'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
}

enum AssetTableColumns {
  ASSET = 'Asset',
  AVAILABLE_BALANCE = 'Available Balance',
  CURRENT_PRICE = 'Current Price',
  TOTAL_VALUE = 'Total Value',
}
enum DefaultPrice {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
}
