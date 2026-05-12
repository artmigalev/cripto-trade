import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLink } from '../../../enums/nav-link.enum';
import {MatListItem, MatListModule} from '@angular/material/list';
import { RouterLink } from "@angular/router";

type NavItem = {
  title: string,
  link: string
}
type NavListType = NavItem[]

@Component({
  selector: 'app-navigation',
  imports: [MatListModule,RouterLink,MatListItem ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NavigationComponent {

  navList: NavListType = [
    {title:NavLink.DASHBOARD, link: '/dashboard'},
    {title:NavLink.MARKETS, link: '/markets'},
    {title:NavLink.TRADE, link: '/trade'},
    {title:NavLink.PORTFOLIO, link: '/portfolio'},
    {title:NavLink.ABOUT_US, link: '/about-us'}
  ]
}
