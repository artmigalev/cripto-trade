import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  baseUrl: string;
  wsUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');
