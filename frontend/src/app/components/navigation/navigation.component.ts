import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLink } from '../../../enums/nav-link.enum';
import { MatListItem, MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  title: NavLink;
  link: string;
}

type NavListType = NavItem[];

@Component({
  selector: 'app-navigation',
  imports: [MatListModule, RouterLink, MatListItem, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  navList: NavListType = Object.values(NavLink).map(value => ({
    title: value,
    link: value.toLowerCase().replaceAll(' ', '-'),
  }));
}
