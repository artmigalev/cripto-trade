import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OrderBookColumns, OrderBookRows } from '@enums/order-book.enum';
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


  order = input<Order>();
  columns = Object.values(OrderBookColumns);
  rows = Object.values(OrderBookRows);
}
