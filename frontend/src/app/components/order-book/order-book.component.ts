import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { mockOrders } from '@components/order-book/mock-data';
import {
  OrderBook,
  OrderBookColumns,
  OrderBookRows,
} from '@enums/order-book.enum';
import { Order } from '@interfaces/order-book.interface';

@Component({
  selector: 'app-order-book',
  imports: [],
  templateUrl: './order-book.component.html',
  styleUrl: './order-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookComponent {
  readonly symbol = input.required<string>();
  protected title = OrderBook['TITLE'];
  orders: Order = mockOrders;
  columns = Object.values(OrderBookColumns);
  rows = Object.values(OrderBookRows);
}
