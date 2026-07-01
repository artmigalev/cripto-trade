import { AuthGuard } from '@auth/auth.guard';
import { KeyDto } from '@keys/dto/key.dto';
import { KeyService } from '@keys/key.service';
import { Body, Request, Controller, Get, Put, UseGuards } from '@nestjs/common';

@Controller('keys')
export class KeyController {
  constructor(private keyService: KeyService) {}


  @UseGuards(AuthGuard)
  @Get()
  getKey(@Request() req: Request) {

    const userId = req['user'].sub;

    return this.keyService.forwardKey(userId);
  }
  @UseGuards(AuthGuard)
  @Put()
  updateKey(@Request() req: Request, @Body() dto: KeyDto) {
    const userId = req['user'].sub;

    return this.keyService.update(userId, dto);
  }
}
