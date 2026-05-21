import { KeyService } from '@keys/key.service';
import { Body, Controller, Get, Put } from '@nestjs/common';

@Controller('keys')
export class KeyController {
  constructor(private keyService: KeyService) {}

  @Get()
  getKey() {
    return this.keyService.forwardKey();
  }

  @Put()
  updateKey(@Body() key: string) {
    return this.keyService.update(key);
  }
}
