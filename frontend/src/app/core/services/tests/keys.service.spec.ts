import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@services/auth.service';
import { API_CONFIG } from '@services/tokens/api-config.tokens';
import { KeysService } from '@services/keys.service';
import { PayloadKeys } from '@interfaces/keys.interface';

describe('Keys Service', () => {
  let keyService: KeysService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
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
    keyService = TestBed.inject(KeysService);

    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should return key and status', async () => {
    const keys = { apiKey: 'apiKey', configured: true };
    const promise = keyService.getKeys();
    const request = httpMock.expectOne(`http://localhost:3000/keys`);

    expect(request.request.method).toBe('GET');
    request.flush(keys);

    expect(await promise).toEqual(keys);
  });
  it('should returned  key and status', async () => {
    const result = { apiKey: 'apiKey', configured: true };
    const payload: PayloadKeys = { apiKey: 'apiKey', secretKey: 'secretKey' };
    const promise = keyService.saveKeys(payload);
    const request = httpMock.expectOne(`http://localhost:3000/keys`);

    expect(request.request.method).toBe('PUT');
    request.flush(result);

    expect(await promise).toEqual(result);
  });
});
