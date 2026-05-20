import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { RouterLinks } from '@/enums/nav-link.enum';

const publicPath = [RouterLinks.LOGIN, RouterLinks.REGISTER];

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const path = route.routeConfig?.path;

  if (path && publicPath.includes(path as RouterLinks)) {
    if (authService.isApiConfigured()) {
      return router.parseUrl(`${RouterLinks.DASHBOARD}`);
    }
    return true;
  }

  if (authService.isApiConfigured()) {
    return true;
  }
  return router.parseUrl(`${RouterLinks.SETTINGS}`);
};
