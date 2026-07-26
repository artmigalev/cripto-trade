import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthService } from '@/app/core/services/auth.service';
import { API_CONFIG } from '@/app/core/services/tokens/api-config.tokens';
import { authInterceptor } from '@/app/shared/interceptors/auth-interceptor';
import { errorInterceptor } from '@/app/shared/interceptors/error.interseptor';
import { MarketService } from '@services/market.service';
import { WebsocketService } from '@services/websocket.service';
import { GlobalErrorHandler } from '@/app/core/handlers/global-error.handler';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const ICONS = ['favorit_card', 'favorit_toggle'] as const;

const parserIcon = () => {
  return provideAppInitializer(() => {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    ICONS.forEach(name => {
      iconRegistry.addSvgIcon(
        name,
        sanitizer.bypassSecurityTrustResourceUrl(`/icons/${name}.svg`)
      );
    });
  });
};

export const appConfig: ApplicationConfig = {
  providers: [
    parserIcon(),
    provideAppInitializer(async () => {
      try {
        const webSocketService = inject(WebsocketService);
        const marketService = inject(MarketService);
        const authService = inject(AuthService);

        webSocketService.connect();
        webSocketService.subscribeStream(marketService['stream']);
        await authService.checkKeys();
        await marketService.init();
      } catch (error) {
        console.error(error);
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor]),
      withFetch()
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: '/api',
        wsUrl: 'wss://ws-api.testnet.binance.vision/ws-api/v3',
        backendUrl: 'https://adaptable-mercy-production-f08d.up.railway.app',
      },
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideCharts(withDefaultRegisterables()),
  ],
};
