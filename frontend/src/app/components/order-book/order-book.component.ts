import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-book',
  imports: [],
  templateUrl: './order-book.component.html',
  styleUrl: './order-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookComponent {}
