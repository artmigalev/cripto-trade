import { DecimalPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter',
})
export class ConverterPipe implements PipeTransform {
  decimalPipe = inject(DecimalPipe);
  transform(value: number, symbol: string) {
    let newValue;
    switch (symbol) {
      case 'BTC':
        newValue = value / 10 ** 8;
        return this.decimalPipe.transform(newValue, '1.8-8');

      default:
        newValue = value / 10 ** 2;

        return this.decimalPipe.transform(newValue, '1.2-2');
    }
  }
}
