import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  protected title = OrderBook['TITLE'];
  readonly symbol = input.required<string>();
  order = input<Order | null>();
  columns = Object.values(OrderBookColumns);
  rows = Object.values(OrderBookRows);
}
