import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ApiService } from '@services/api.service';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthRotes, NavLink } from '@/enums/nav-link.enum';
import { MatListItem, MatNavList } from '@angular/material/list';
import { AuthService } from '@/app/core/services/auth.service';

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
  apiService = inject(ApiService);
  private readonly authService = inject(AuthService);

  isAuthenticated = computed(() => this.authService.isApiConfigured());
  homeLink = NavLink.Dashboard.toLowerCase();

  authLinks = Object.entries(AuthRotes)
    .map(([title, link]) => ({
      title: title,
      link: link.toLowerCase(),
    }))
    .filter(({ title }) =>
      this.isAuthenticated() ? title === AuthRotes.Logout : title !== AuthRotes.Logout
    );
}
