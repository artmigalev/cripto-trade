import { authGuard } from '@/app/shared/guards/auth-guard';
import { NavLink } from '@/enums/nav-link.enum';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-page.component'),
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
  },

  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component'),
    canActivate: [authGuard],
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-as/about-as.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login-page/login-page.component'),
    title: NavLink.LOGIN,

    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register-page/register-page.component'),
    title: NavLink.REGISTER,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component'),
  },
];
