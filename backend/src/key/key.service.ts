import { keys } from '@/src/constants';
import { ResponseKey } from '@interfaces/key.interface';
import { KeyDto } from '@keys/dto/key.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class KeyService {
  private readonly keys = new Map<string, KeyDto>([
    ['test', keys],
  ]);

  forwardKey(userId: string): ResponseKey {
    const key = this.keys.get(userId);


    if (!key) {
      return {
        apiKey: '',
        configured: false,
      };
    }

    return {
      apiKey: key?.apiKey,
      configured: true,
    };
  }

  getKey(userId: string) {
    if (userId && this.keys.has(userId)) {
      return this.keys.get(userId);
    } else {
      throw new UnauthorizedException('invalid user');
    }
  }

  update(userId: string, key: KeyDto): ResponseKey {
    this.keys.set(userId, {
      apiKey: key.apiKey.trim(),
      secretKey: key.secretKey.trim(),
    });

    return { apiKey: key.apiKey.trim(), configured: true };
  }
}
