import { API_CONFIG } from '@services/tokens/api-config.tokens';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly _isApiConfigured = signal<boolean>(
    !!localStorage.getItem('binance_keys')
  );
  private readonly _isAuthenticated = signal<boolean>(
    !!localStorage.getItem('access_token')
  );

  private readonly config = inject(API_CONFIG);

  isApiConfigured = this._isApiConfigured.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();

  async login(email: string, password: string) {
    const response = await firstValueFrom(
      this.http.post<{ access_token: string }>(
        `${this.config.backendUrl}/auth/login`,
        {
          email,
          password,
        }
      )
    );

    localStorage.setItem('access_token', response['access_token']);
    this._isAuthenticated.set(true);
  }

  async register(email: string, password: string) {
    const response = await firstValueFrom(
      this.http.post<{ access_token: string }>(
        `${this.config.backendUrl}/auth/register`,
        {
          email,
          password,
        }
      )
    );

    localStorage.setItem('access_token', response['access_token']);
    this._isAuthenticated.set(true);
  }

  logout() {
    localStorage.removeItem('access_token');
    this._isAuthenticated.set(false);
  }

  async getKeys() {
    const response = await firstValueFrom(
      this.http.get<{
        apiKey: string;
        configured: boolean;
      }>(`${this.config.backendUrl}/keys`)
    );
    return response;
  }
  async getAccount() {
    return await firstValueFrom(
      this.http.get(`${this.config.backendUrl}/auth/me`)
    );
  }

  async checkKeys() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.setKeysConfigured(false);
      localStorage.removeItem('binance_keys');
      return;
    }

    try {
      const { configured } = await this.getKeys();
      this.setKeysConfigured(configured);
    } catch {
      this._isApiConfigured.set(false);
    }
  }
  setKeysConfigured(status: boolean): void {
    this._isApiConfigured.set(status);
  }
}
