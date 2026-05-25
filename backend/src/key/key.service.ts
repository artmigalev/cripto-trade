import { ResponseKey } from '@interfaces/key.interface';
import { KeyDto } from '@keys/dto/key.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyService {
  private readonly keys = new Map<string, KeyDto>();

  forwardKey(userId: string):ResponseKey {
    const key = this.keys.get(userId);

    if (!key) {
      return {
        apiKey: '',
        configured: false
      }
    }

    return {
      apiKey: key?.apiKey,
      configured: true
    }
  }

  update(userId: string, key: KeyDto):ResponseKey {
    this.keys.set(userId, key);

    return {
      apiKey: key?.apiKey,
      configured: true,
    };
  }
}
