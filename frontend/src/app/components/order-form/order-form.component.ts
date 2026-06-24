import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ErrorOrderFormMsg,
  OrderForm,
  OrderSide,
} from '@enums/order-form.enum';
import { form, FormField, required } from '@angular/forms/signals';
import { OrderFormParameters } from '@interfaces/order-form.interface';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { TradeService } from '@services/trade.service';
import { OrderType, TimeInForce } from '@binance/connector-typescript';
@Component({
  selector: 'app-order-form',
  imports: [FormField, ɵInternalFormsSharedModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  private readonly tradeService = inject(TradeService);
  protected readonly title = OrderForm['TITLE'];
  private symbol = computed(() => this.tradeService.chartSymbol());

  protected readonly orderType = OrderType;
  protected readonly orderSide = OrderSide;
  protected readonly timeForce = TimeInForce;

  formModel = signal<OrderFormParameters>({
    symbol: this.symbol(),
    side: OrderSide.Buy,
    type: 'LIMIT',
    timeInForce: 'GTC',
    price: 0,
    quantity: 0,
    timestamp: Date.now().toString(),
  });
  formOrder = form(this.formModel, schemaPath => {
    required(schemaPath.price, { message: ErrorOrderFormMsg.Required });
    required(schemaPath.quantity, { message: ErrorOrderFormMsg.Required });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.formOrder().errors());
  }
}
