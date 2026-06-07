import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthService } from '@/app/core/services/auth.service';
import { API_CONFIG } from '@/app/core/services/tokens/api-config.tokens';
import { authInterceptor } from '@/app/shared/interceptors/auth-interceptor';
import { errorInterceptor } from '@/app/shared/interceptors/error.interseptor';
import { MarketService } from '@services/market.service';
import { GlobalErrorComponent } from '@/app/core/handlers/global-error/global-error.component';
import { WebsocketService } from '@services/websocket.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(async () => {
      try {
        const webSocketService = inject(WebsocketService);
        const marketService = inject(MarketService);
        const authService = inject(AuthService);

        await webSocketService.connect();
        await authService.checkKeys();
        await marketService.init();
      } catch (error) {
        console.error(error);
      }
    }),
    provideAnimationsAsync(),
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
    {
      provide: ErrorHandler,
      useClass: GlobalErrorComponent,
    },
  ],
};
