import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  viewChild,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { OrderHistory } from '@interfaces/portfolio.interface';

@Component({
  selector: 'app-order-history',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryComponent {
  orders = input<OrderHistory[]>();
  readonly sortableColumns = new Set<keyof OrderHistory>(['side', 'type']);
  private sort = viewChild(MatSort);

  protected displayedColumns: (keyof OrderHistory)[] = [
    'time',
    'symbol',
    'side',
    'type',
    'preventedQuantity',
    'price',
    'status',
  ];
  protected columnsLabels: Record<keyof OrderHistory, string> = {
    time: 'Date',
    symbol: 'Pair',
    side: 'Side',
    type: 'Type',
    preventedQuantity: 'Quantity',
    price: 'Price',
    status: 'Status',
  };
  labels = Object.values(this.columnsLabels);
  dataSource = new MatTableDataSource<OrderHistory>();

  constructor() {
    effect(() => {
      const sort = this.sort();
      this.dataSource.sort = sort;
    });

    effect(() => {
      this.dataSource.data = this.orders()!;
      this.dataSource.sortingDataAccessor = (item, property) => {
        return item[property as keyof OrderHistory] as string | number;
      };
    });
  }
}

// толбцы: Дата, Пара, Сторона (Купить/Продать), Тип (Рынок/Лимит), Количество, Цена, Статус. -->
//Columns: Date, Pair, Side (Buy/Sell), Type (Market/Limit), Quantity, Price, Status.
//<!-- Таблица пользовательских заказов, загруженная из API (GET /api/v3/allOrders, HMAC).
