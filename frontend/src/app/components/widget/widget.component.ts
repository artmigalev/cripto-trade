import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Widget } from '@interfaces/widget.interface';
import { MatIcon } from '@angular/material/icon';
import { ConverterPipe } from '@pipes/converter.pipe';

@Component({
  selector: 'app-widget',
  imports: [MatIcon, ConverterPipe],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {
  type = input<Widget['type']>();
  data = input<Widget['data']>();
}
