import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyService {


  forwardKey() {
    return 'crypto-watchlist';
  }

  update(key:string) {
    return key;
  }


}
