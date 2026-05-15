import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isApiConfigured = signal<boolean>(true);
  isApiConfigured = this._isApiConfigured.asReadonly();


  checkKeys() : void {
    const keys = localStorage.getItem('binance_keys');
    this._isApiConfigured.set(!!keys);
  }
  setKeysConfigured(status:boolean): void {
    this._isApiConfigured.set(status);
  }
}
