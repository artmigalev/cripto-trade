import { Routes } from '@angular/router';
import { canActivateFnGuard } from '@guards/can-activate-fn-guard';

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
    canActivate: [canActivateFnGuard],
  },

  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio.component'),
    canActivate: [canActivateFnGuard],
  },
  {
    path: 'about-us',
    loadComponent: () => import('./features/about-as/about-as.component'),
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
