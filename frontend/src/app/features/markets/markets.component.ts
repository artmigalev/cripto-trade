import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TabsComponent } from '@components/tabs/tabs.component';

@Component({
  selector: 'app-markets',
  imports: [TabsComponent],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export default class MarketsComponent {}
