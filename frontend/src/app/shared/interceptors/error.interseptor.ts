import { RouterLinks } from '@/enums/nav-link.enum';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = req.url.includes('/auth');
      switch (error.status) {
        case 401:
          if (isAuthRequest) {
            localStorage.removeItem('access_token');
            router.navigate([RouterLinks.Login]);
          }
          break;
        case 403:
          router.navigate([RouterLinks.Dashboard]);
          break;
        case 500:
          console.error('Server error:', error.message);
          break;
      }
      return throwError(() => error);
    })
  );
};
