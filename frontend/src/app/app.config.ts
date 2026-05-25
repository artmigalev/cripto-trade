import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthService } from '@/app/core/services/auth.service';
import { API_CONFIG } from '@/app/core/services/tokens/api-config.tokens';
import { authInterceptor } from '@/app/shared/interceptors/auth-interceptor';
import { errorInterceptor } from '@/app/shared/interceptors/error.interseptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(AuthService).checkKeys()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: '/api',
        wsUrl: 'wss://ws-api.testnet.binance.vision/ws-api/v3',
        backendUrl: 'http://localhost:3000',
      },
    },
  ],
};
