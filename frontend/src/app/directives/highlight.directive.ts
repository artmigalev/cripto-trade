import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.color]': '(change() < 0) ? "red": defaultColor',
  },
})
export class HighlightDirective {
  readonly defaultColor = 'green';
  readonly change = input<number>(0, { alias: 'appHighlight' });

}
