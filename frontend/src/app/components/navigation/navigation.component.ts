import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NavLink, RouterLinks } from '@enums/nav-link.enum';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  title: string;
  link: RouterLinks;
}

// type NavListType = NavItem[];

@Component({
  selector: 'app-navigation',
  imports: [MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  positionColumn = true;
  isAuth = input.required<boolean>();
  navList = computed(() => this.getLinks(this.isAuth()));

  getLinks(status: boolean): NavItem[] {
    const links = Object.entries(NavLink).map(([title]) => ({
      title,
      link: RouterLinks[title as keyof typeof RouterLinks],
    })) as NavItem[];

    if (!status) {
      return links.filter(
        ({ title }) =>
          title !== 'Logout' && {
            title,
            link: RouterLinks[title as keyof typeof RouterLinks],
          }
      );
    } else {
      return links.filter(
        ({ title }) =>
          title !== NavLink.Login &&
          title !== NavLink.Register && {
            title,
            link: RouterLinks[title as keyof typeof RouterLinks],
          }
      );
    }
  }
}
