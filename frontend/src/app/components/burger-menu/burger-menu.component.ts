import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NavigationComponent } from '@components/navigation/navigation.component';

@Component({
  selector: 'app-burger-menu',
  imports: [NavigationComponent],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.open]': 'active()',
  },
})
export class BurgerMenuComponent {
  active = input();
  isAuth = input.required<boolean>();
  changeBurger = input<void>();
}
