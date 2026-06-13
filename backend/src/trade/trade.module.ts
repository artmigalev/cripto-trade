import { HMACService } from "@/src/hmac/hmac.service";
import { TradeController } from "@/src/trade/trade.controller";
import { TradeService } from "@/src/trade/trade.service";
import { KeyService } from "@keys/key.service";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";


@Module({
  imports: [HttpModule],
  controllers: [TradeController],
  providers: [TradeService, HMACService, KeyService],
})
export class TradeModule {}
