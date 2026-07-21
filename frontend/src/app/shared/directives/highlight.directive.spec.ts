import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  signal,
} from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <h2 appHighlight="{{ value() }}">Highlight</h2>
    <h2>No Highlight</h2>
  `,
  imports: [HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  value = input<string>('0');
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should color h2 green', () => {
    fixture.componentRef.setInput('value', '1');
    fixture.detectChanges();

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.style.color).toBe('green');
  });
  it('should color h2 red', () => {
    fixture.componentRef.setInput('value', '-1');
    fixture.detectChanges();

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');

    expect(h2.style.color).toBe('red');
  });
});
