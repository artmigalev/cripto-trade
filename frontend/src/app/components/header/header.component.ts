import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ApiService } from '@services/api.service';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { RouterLink } from '@angular/router';
import { NavLink } from '@/enums/nav-link.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigationComponent, SearchBarComponent, StatusIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  apiService = inject(ApiService);
  homeLink = NavLink.DASHBOARD.toLowerCase();
}
