import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { AuthService } from '@services/auth.service';
import { API_CONFIG } from '@services/tokens/api-config.tokens';

describe('App', () => {
  let title: () => string;
  beforeEach(async () => {
    const mockAuthService = {
      isAuthenticated: () => false,
      isApiConfigured: () => false,
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: API_CONFIG,
          useValue: {
            baseUrl: '/api',
            wsUrl: 'wss://ws-api.testnet.binance.vision/ws-api/v3',
            backendUrl: 'http://localhost:3000',
          },
        },
      ],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    const h1 = fixture.componentInstance;
    fixture.detectChanges();
    expect(h1['title']()).toEqual('crypto-trade');
  });
});
