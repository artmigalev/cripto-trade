import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '[style.color]': '(result()) ? "red" : this.defaultColor',
  },
})
export class HighlightDirective {
  readonly defaultColor = 'green';
  readonly change = input<string>('', { alias: 'appHighlight' });
  readonly result = computed(() => Number(this.change()) < 0);
}
