import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { StatusIconComponent } from '@components/status-icon/status-icon.component';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { NavLink, RouterLinks } from '@enums/nav-link.enum';
import { AuthService } from '@services/auth.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { BurgerMenuComponent } from '@components/burger-menu/burger-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavigationComponent,
    SearchBarComponent,
    StatusIconComponent,
    RouterLink,
    BurgerMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private breakpoint = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpoint
      .observe('(max-width: 768px)')
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  homeLink = NavLink.Dashboard.toLowerCase();

  open = signal<boolean>(false);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.open() === true) this.onClickBurger(false);

        if (event.url.slice(1) === NavLink.Logout.toLowerCase()) {
          this.logout();
        }
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate([RouterLinks.Login]);
  }
  onClickBurger(status?: boolean) {
    this.open.update(prev => status || !prev);
  }
}
