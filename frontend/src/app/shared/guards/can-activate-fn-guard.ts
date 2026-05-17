import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { NavLink } from '@/enums/nav-link.enum';

export const canActivateFnGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isApiConfigured()) {
    return true;
  }
  return router.parseUrl(`${NavLink.SETTINGS.toLowerCase()}`);
};
