import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface State {
  side: string;
  type: string;
  price: string;
  amount: string;
}

// type SchemaKeys = keyof typeof orderFormShema & string

@Component({
  selector: 'app-order-form',
  imports: [MatIconModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  private orderState = signal<State>({
    side: 'Buy',
    type: 'Market',
    price: '',
    amount: '',
  });
  ifPrice = computed(() => this.orderState().type === 'Limit');
  protected readonly orderFormShema = {
    side: { data: ['Buy', 'Sell'], label: 'Side' }, //'Side',
    type: { data: ['Market', 'Limit'], label: 'Order Type' }, // 'Order Type',
    amount: 'Amount',
    price: 'Price',
  } as const;

  protected readonly schemaKeys: (keyof typeof this.orderFormShema)[] = [
    'type',
    'side',
    'amount',
    'price',
  ];
}
