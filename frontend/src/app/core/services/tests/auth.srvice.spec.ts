import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@services/auth.service';
import { API_CONFIG } from '@services/tokens/api-config.tokens';

describe('Auth Service', () => {
  const userMock = {
    email: 'email',
    password: 'password',
  };
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  let authService: AuthService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: API_CONFIG,
          useValue: {
            baseUrl: '/api',
            wsUrl: 'wss://ws-api.testnet.binance.vision/ws-api/v3',
            backendUrl: 'http://localhost:3000',
          },
        },
      ],
    });
    authService = TestBed.inject(AuthService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    httpMock.verify();
  });

  it('should authenticate user and store access token', async () => {
    const promise = authService.login(userMock.email, userMock.password);

    const request = httpMock.expectOne(`http://localhost:3000/auth/login`);
    request.flush({ access_token: 'token' });
    await promise;

    expect(request.request.body).toEqual(userMock);
    expect(request.request.method).toBe('POST');
    expect(authService.isAuthenticated()).toBe(true);
  });
  it('should register user and store access token', async () => {
    const promise = authService.register(userMock.email, userMock.password);

    const request = httpMock.expectOne(`http://localhost:3000/auth/register`);
    request.flush({ access_token: 'token' });
    await promise;

    expect(request.request.body).toEqual(userMock);
    expect(request.request.method).toBe('POST');
    expect(authService.isAuthenticated()).toBe(true);
  });
  it('should  user unauthenticated and remove access token', async () => {
    const token = 'token';
    const promise = authService.login(userMock.email, userMock.password);

    const request = httpMock.expectOne(`http://localhost:3000/auth/login`);
    request.flush({ access_token: token });
    await promise;
    expect(authService.isAuthenticated()).toBe(true);

    authService.logout();

    expect(authService.isAuthenticated()).toBe(false);
    expect(localStorage.getItem('access_token')).toBe(null);
  });
});
