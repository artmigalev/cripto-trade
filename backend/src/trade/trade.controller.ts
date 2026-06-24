import { TradeService } from '@/src/trade/trade.service';
import { AuthGuard } from '@auth/auth.guard';
import { KeyDto } from '@keys/dto/key.dto';
import { KeyService } from '@keys/key.service';
import { Body, Request, Controller, Get, Put, UseGuards, Post } from '@nestjs/common';

@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @UseGuards(AuthGuard)
  @Post('/create-order') //POST /api/v3/order
  async sendNewOrder(@Body() orderData: Record<string, string>, @Request() req) {
    const userId = req['user'].sub;

    console.log('Getting keys for userId:', userId);
    return this.tradeService.sendOrder(orderData, userId);
  }
}
