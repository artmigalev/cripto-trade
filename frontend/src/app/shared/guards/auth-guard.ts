import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { RouterLinks } from '@enums/nav-link.enum';
import { environment } from '@/environments/environment';

const publicPath = [RouterLinks.Login, RouterLinks.Register];

const privatePaths = [, RouterLinks.Portfolio];

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const path = route.routeConfig?.path;

  const isAuth: boolean = authService.isAuthenticated();
  const isConfig: boolean = authService.isApiConfigured();

  const isByPassAuth = !environment.production && environment.devModeSkipAuth;
  console.log(isByPassAuth);

  if (isByPassAuth) {

    return true;
  }

  if (privatePaths.includes(path as RouterLinks)) {
    if (!isAuth) {
      return router.parseUrl(`${RouterLinks.Login}`);
    }
    if (!isConfig) {
      return router.parseUrl(`${RouterLinks.Settings}`);
    }
  }
  if (publicPath.includes(path as RouterLinks)) {
    if (isAuth) {
      return router.parseUrl(`${RouterLinks.Dashboard}`);
    }
    return true;
  }
  if (path && path === RouterLinks.Settings) {
    if (!isAuth) {
      return router.parseUrl(RouterLinks.Login);
    }
  }

  return true;
};
