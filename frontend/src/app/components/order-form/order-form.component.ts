import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  applyWhen,
  form,
  FormField,
  FormRoot,
  hidden,
  required,
  validate,
} from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '@services/portfolio.service';
import { ConverterPipe } from '../../shared/pipes/converter.pipe';
import { AuthService } from '@services/auth.service';

interface OrderFormModel {
  side: ('Buy' | 'Sell') & string;
  type: ('Limit' | 'Market') & string;
  price: string;
  amount: string;
}

// type SchemaKeys = keyof typeof orderFormShema & string

@Component({
  selector: 'app-order-form',
  imports: [MatIconModule, FormField, FormRoot, ConverterPipe],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  private readonly portfolioService = inject(PortfolioService);
  ;
  protected SCHEMA_CONFIG = {
    side: ['Buy', 'Sell'],
    type: ['Limit', 'Market'],
    amount: {
      label: 'Amount',
      placholder: orderFormMsg.amount.placeholder,
      value: '',
    },
    price: {
      label: 'Price',
      placholder: orderFormMsg.price.placeholder,
      value: '',
    },
  } as const;

  private DEFAULT_SCHEMA: OrderFormModel = {
    side: 'Buy',
    type: 'Limit',
    amount: '',
    price: '',
  };

  private formModel = signal<OrderFormModel>({
    ...this.DEFAULT_SCHEMA,
  });
  typeForm = computed(() => this.formModel().type);
  protected readonly balance = computed(() =>
    this.portfolioService.portfolioValueUSD()
  );
  orderForm = form(
    this.formModel,
    formField => {
      required(formField.amount, { message: orderFormMsg.amount.required });
      validate(formField.amount, ({ value }) => {
        if (Number(value()) > 10000) {
          return {
            kind: 'confirm',
            message: orderFormMsg.amount.limit,
          };
        }
        return null;
      });
      hidden(formField.price, {
        when: ({ valueOf }) => valueOf(formField.type) === 'Market',
      });
      applyWhen(
        formField,
        () => this.typeForm() === 'Limit',
        formField => {
          required(formField.price, { message: orderFormMsg.price.required });
        }
      );
    },
    {
      submission: {
        action: async () => {
          console.log(this.orderForm);
        },
      },
    }
  );
}

const orderFormMsg = {
  amount: {
    required: `Required field`,
    limit: 'You have exceeded the limit',
    placeholder: 'Please indicate the quantity ...',
  },
  price: {
    required: `Required field`,
    placeholder: 'Please indicate the price ...',
  },
};
