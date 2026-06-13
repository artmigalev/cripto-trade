import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { SearchBarComponent } from '@components/search-bar/search-bar.component';
import { StatusIconComponent } from '@components/status-icon/status-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthRotes, NavLink } from '@enums/nav-link.enum';
import { MatListItem, MatNavList } from '@angular/material/list';
import { AuthService } from '@services/auth.service';
import { HeaderNavLink } from '@interfaces/header.interface';

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

  isAuthenticated = computed(() => this.authService.isAuthenticated());
  homeLink = NavLink.Dashboard.toLowerCase();

  authLinks: HeaderNavLink[] = Object.entries(AuthRotes)
    .map(([title, link]) => ({
      title: title,
      link: link.toLowerCase(),
    }))
    .filter(({ title }) =>
      this.isAuthenticated()
        ? title === AuthRotes.Logout
        : title !== AuthRotes.Logout
    );
}
