import { inject, Injectable, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading = signal<boolean>(false);
  loading = this._loading.asReadonly();

  private readonly router = inject(Router);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._loading.set(true);
      }
      if (
        event instanceof NavigationCancel ||
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this._loading.set(false), 500);
      }
    });
  }
}
