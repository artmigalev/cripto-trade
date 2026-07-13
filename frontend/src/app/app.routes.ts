import { klinesResolver } from '@/app/core/resolvers/klines.resolver';
import { authGuard } from '@/app/shared/guards/auth-guard';
import { NavLink } from '@/enums/nav-link.enum';
import { Routes } from '@angular/router';
import { portfolioResolver } from '@resolver/portfolio.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page.component'),
  },
  {
    path: 'markets',
    loadComponent: () => import('./features/markets/markets.component'),
  },
  {
    path: 'trade',
    redirectTo: 'trade/BTCUSDT',
    pathMatch: 'full',
  },
  {
    path: 'trade/:symbol',
    loadComponent: () => import('./features/trade/trade.component'),
    canActivate: [authGuard],

    resolve: {
      symbol: klinesResolver,
    },
  },

  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component'),
    canActivate: [authGuard],

    resolve: {
      portfolio: portfolioResolver,
    },
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-as/about-as.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login-page/auth-page.component'),
    title: NavLink.Login,

    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./features/login-page/auth-page.component'),
    title: NavLink.Register,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component'),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component'),
  },
];
