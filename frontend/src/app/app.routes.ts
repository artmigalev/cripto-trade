import { Routes } from '@angular/router';
import { canActivateFnGuard } from './guards/can-activate-fn-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard-page.component'),
  },
  {
    path: 'markets',
    loadComponent: () => import('./pages/markets/markets.component'),
  },
  {
    path: 'trade/:symbol',
    loadComponent: () => import('./pages/trade/trade.component'),
    canActivate: [canActivateFnGuard],
  },

  {
    path: 'trade',
    redirectTo: 'trade/BTCUSDT',
    pathMatch: 'full',
  },

  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component'),
    canActivate: [canActivateFnGuard],
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about-as/about-as.component'),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component'),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
];
