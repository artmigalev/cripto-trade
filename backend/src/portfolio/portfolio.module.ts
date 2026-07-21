import { HMACService } from '@/src/hmac/hmac.service';
import { PortfolioController } from '@/src/portfolio/portfolio.controller';
import { PortfolioService } from '@/src/portfolio/portfolio.service';
import { TradeController } from '@/src/trade/trade.controller';
import { TradeService } from '@/src/trade/trade.service';
import { KeyModule } from '@keys/key.module';
import { KeyService } from '@keys/key.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, KeyModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, HMACService],
})
export class PortfolioModule {}
