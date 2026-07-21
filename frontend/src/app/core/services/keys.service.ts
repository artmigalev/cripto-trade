import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PayloadKeys, ResponseKey } from '@interfaces/keys.interface';
import { API_CONFIG } from '@services/tokens/api-config.tokens';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeysService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);

  async getKeys() {
    const response = await firstValueFrom(
      this.http.get<ResponseKey>(`${this.config.backendUrl}/keys`)
    );
    return response;
  }
  async saveKeys({ apiKey, secretKey }: PayloadKeys): Promise<ResponseKey> {
    return await firstValueFrom(
      this.http.put<ResponseKey>(`${this.config.backendUrl}/keys`, {
        apiKey,
        secretKey,
      })
    );
  }
}
