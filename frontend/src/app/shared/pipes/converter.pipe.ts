import { FavoriteSymbol } from '@enums/keys.enum';
import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter',
})
export class ConverterPipe implements PipeTransform {
  private readonly decimalPipe = new DecimalPipe('en-US');
  transform(value: number, symbol: string) {
    if (symbol.endsWith(FavoriteSymbol.BTC)) {
      return this.decimalPipe.transform(value, '1.8-8');
    }

    if (symbol.endsWith(FavoriteSymbol.USDT)) {
      return this.decimalPipe.transform(value, '1.2-2');
    }
    return value;
  }
}
