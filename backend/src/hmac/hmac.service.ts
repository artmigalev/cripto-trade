import { KeyService } from "@keys/key.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class HMACService {

  private keyService: KeyService;


  constructor(@Inject(KeyService) keyService: KeyService) {
    this.keyService = keyService;
  }


  async sign(userID:string, queryString:string) {

    const key = this.keyService.getKey(userID);
    if (key) {

      let enc = new TextEncoder();
      const queryBytes = enc.encode(queryString);
      const keyBytes = enc.encode(key.secretKey);


      const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);

      const signature = await crypto.subtle.sign('HMAC', cryptoKey, queryBytes);
       return Array.from(new Uint8Array(signature))
         .map(b => b.toString(16).padStart(2, '0'))
         .join('');
    } else {
      throw new UnauthorizedException('Api key not found')
    }


  }



}
