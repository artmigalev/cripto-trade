import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLink } from '@enums/nav-link.enum';
import { MatListItem, MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  title: string;
  link: keyof typeof NavLink;
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
  navList = Object.entries(NavLink).map(
    ([title, link]) => ({ title: title, link: link.toLowerCase() }) as NavItem
  );
}
