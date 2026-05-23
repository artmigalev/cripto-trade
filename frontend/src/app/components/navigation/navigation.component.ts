import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavLink, PrivateRoutes, PublicRoutes } from '@enums/nav-link.enum';
import { MatListItem, MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@services/auth.service';

interface NavItem {
  title: NavLink;
  link: string;
}

// type NavListType = NavItem[];

@Component({
  selector: 'app-navigation',
  imports: [MatListModule, RouterLink, MatListItem, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private readonly authService = inject(AuthService);

  isAuthenticated = computed(() => this.authService.isApiConfigured());
  navList = Object.entries(this.isAuthenticated() ? PrivateRoutes : PublicRoutes).map(
    ([title, link]) => ({ title, link }) as NavItem
  );
}
