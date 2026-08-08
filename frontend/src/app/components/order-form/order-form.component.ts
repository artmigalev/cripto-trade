import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-form',
  imports: [],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {}
