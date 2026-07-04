import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appHintBalance]',
  standalone: true,
})
export class HintBalanceDirective {
  private el = inject(ElementRef<HTMLInputElement>);
  readonly balance = input<number>(undefined, {
    alias: 'appHintBalance',
  });

  color = '';

  @HostListener('input')
  onInput() {
    const value = Number(this.el.nativeElement.value);

    this.el.nativeElement.style.color =
      value > (this.balance() ?? 0) ? 'red' : 'green';
  }
}
