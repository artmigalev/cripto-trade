import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { StatusIconComponent } from '@components/status-icon/status-icon.component';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthRotes, NavLink } from '@enums/nav-link.enum';
import { MatListItem, MatNavList } from '@angular/material/list';
import { AuthService } from '@services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavigationComponent,
    SearchBarComponent,
    StatusIconComponent,
    RouterLink,
    MatNavList,
    MatListItem,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  homeLink = NavLink.Dashboard.toLowerCase();

  authLinks = computed(() =>
    Object.entries(AuthRotes)
      .map(([title, link]) => ({
        title: title,
        link: link.toLowerCase(),
      }))
      .filter(({ title }) =>
        this.isAuthenticated()
          ? title === AuthRotes.Logout
          : title !== AuthRotes.Logout
      )
  );
  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url.slice(1) === AuthRotes.Logout.toLowerCase()) {
          this.authService.logout();
        }
      }
    });
  }
}
