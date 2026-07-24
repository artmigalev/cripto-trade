import { FavoriteSymbol } from '@enums/keys.enum';
import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter',
  standalone: true,
})
export class ConverterPipe implements PipeTransform {
  private readonly decimalPipe = new DecimalPipe('en-US');
  transform(value: number | string, symbol: string) {
    if (symbol.endsWith(FavoriteSymbol.BTC)) {
      const digit = Number(value) < 1 ? '1.2-8' : '1.2-2';

      return this.decimalPipe.transform(value, digit);
    }

    if (symbol.endsWith(FavoriteSymbol.USDT)) {
      return this.decimalPipe.transform(value, '1.2-2');
    }
    return value;
  }
}
