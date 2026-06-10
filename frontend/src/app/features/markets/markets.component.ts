import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TabsComponent } from '@components/tabs/tabs.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@Component({
  selector: 'app-markets',
  imports: [TabsComponent, SpinnerComponent],
  standalone: true,
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export default class MarketsComponent {}
