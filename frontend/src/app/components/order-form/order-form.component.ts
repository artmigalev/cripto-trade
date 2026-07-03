import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ErrorOrderFormMsg, OrderSide } from '@enums/order-form.enum';
import { form, FormField, required, FormRoot } from '@angular/forms/signals';
import { OrderFormParameters } from '@interfaces/order-form.interface';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { TradeService } from '@services/trade.service';
import { OrderType, TimeInForce } from '@binance/connector-typescript';
import { AppError } from '@/app/core/handlers/errors/app.error.handler';
@Component({
  selector: 'app-order-form',
  imports: [FormField, ɵInternalFormsSharedModule, FormRoot],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  private readonly tradeService = inject(TradeService);
  // protected readonly title = OrderForm['TITLE'];
  private symbol = computed(() => this.tradeService.chartSymbol());

  protected readonly orderType = OrderType;
  protected readonly orderSide = OrderSide;
  protected readonly timeForce = TimeInForce;

  protected readonly activeSide = signal<OrderSide>(OrderSide.Buy);
  private readonly orderType$ = computed(() => this.formModel().type);
  formModel = signal<OrderFormParameters>({
    symbol: this.symbol(),
    side: OrderSide.Buy,
    type: 'LIMIT',
    timeInForce: 'GTC',
    price: '',
    quantity: '',
    timestamp: Date.now().toString(),
  });
  protected readonly formOrder = form(
    this.formModel,
    schemaPath => {
      required(schemaPath.quantity, { message: ErrorOrderFormMsg.Required });

      if (this.orderType$() === 'LIMIT') {
        required(schemaPath.price, { message: ErrorOrderFormMsg.Required });
      }
    },
    {
      submission: {
        action: async () => {
          try {
            const result = await this.tradeService.placeOrder(this.formModel());
            console.log(result, 'action result');

            return { kind: 'success' as const };
          } catch (error: unknown) {
            if (error instanceof AppError) {
              console.log(error instanceof AppError);

              return { kind: 'serverError' as const, message: error.message };
            }
            return {
              kind: 'serverError' as const,
              message: 'Something went wrong',
            };
          }
        },
        ignoreValidators: 'all',
      },
    }
  );
  onTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as OrderType;
    this.formModel.update(prev => ({ ...prev, type: value }));
  }
  setSide(side: OrderSide) {
    this.activeSide.set(side);
    this.formModel.update(prev => ({ ...prev, side }));
  }
  constructor() {
    effect(() => {
      const symbol = this.symbol();
      this.formModel.update(prev => ({
        ...prev,
        symbol,
      }));
    });
  }
}
