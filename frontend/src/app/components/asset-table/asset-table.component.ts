import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Balance } from '@interfaces/api.interface';
import { MatTableModule } from '@angular/material/table';
import { ConverterPipe } from '@pipes/converter.pipe';

@Component({
  selector: 'app-asset-table',
  imports: [MatTableModule, ConverterPipe],

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

export enum AssetTableColumns {
  ASSET = 'Asset',
  AVAILABLE_BALANCE = 'Available Balance',
  ORDER = 'Order',
  CURRENT_PRICE = 'Current Price',
  TOTAL_VALUE = 'Total Value',
}
export enum DefaultPrice {
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
}
