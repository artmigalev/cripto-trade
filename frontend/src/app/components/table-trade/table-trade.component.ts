import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  viewChild,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableTrade } from '@interfaces/trade-table.interface';
import { ConverterPipe } from '@pipes/converter.pipe';

@Component({
  selector: 'app-table-trade',
  imports: [MatTableModule, MatSortModule, ConverterPipe],
  templateUrl: './table-trade.component.html',
  styleUrl: './table-trade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableTradeComponent<T> {
  private sort = viewChild(MatSort);
  readonly data = input.required<T[]>();
  readonly columnsLabels = input.required<TableTrade<T>['columnsLabels']>();
  readonly displayedColumns =
    input.required<TableTrade<T>['displayedColumns']>();
  readonly options = input<TableTrade<T>['options']>();
  converterValue: string | undefined = undefined;
  sortedColumns = new Set<keyof T>();
  convertedColumns = new Set<keyof T>();

  dataSource = new MatTableDataSource<T>();

  constructor() {
    effect(() => {
      const options = this.options();
      this.sortedColumns.clear();
      if (options && options.sortOptions.status) {
        this.sortedColumns = new Set(options.sortOptions.columns);
        const sort = this.sort();
        this.dataSource.sort = sort;
      }
      if (options && options.convert.status) {
        this.convertedColumns = new Set(options.convert.columns);
        this.converterValue = options.convert.value;
      }
    });

    effect(() => {
      this.dataSource.data = this.data();
      this.dataSource.sortingDataAccessor = (item, property) => {
        return item[property as keyof T] as string | number;
      };
    });
  }
}
