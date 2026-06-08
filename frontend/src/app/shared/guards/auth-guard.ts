import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { RouterLinks } from '@enums/nav-link.enum';

const publicPath = [RouterLinks.Login, RouterLinks.Register];

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const path = route.routeConfig?.path;

  if (path && publicPath.includes(path as RouterLinks)) {
    if (authService.isAuthenticated()) {
      return router.parseUrl(`${RouterLinks.Dashboard}`);
    }
    return true;
  }

  if (authService.isAuthenticated()) {
    return true;
  }
  return router.parseUrl(`${RouterLinks.Settings}`);
};
