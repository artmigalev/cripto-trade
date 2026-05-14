import { DecimalPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter',
})
export class ConverterPipe implements PipeTransform {
  decimalPipe = inject(DecimalPipe);
  transform(value: number, symbol: string) {
    switch (symbol) {
      case 'BTC':
        // newValue = value / 10 ** 8;
        return this.decimalPipe.transform(value, '1.8-8');

      case 'USDT':
        return this.decimalPipe.transform(value, '1.2-2');
      default:
        return value;
    }
  }
}
