import { Module } from '@nestjs/common';
import { AuthModule } from '@/src/auth/auth.module';
import { KeyModule } from './key/key.module';
import { TradeModule } from '@/src/trade/trade.module';
import { PortfolioModule } from '@/src/portfolio/portfolio.module';

@Module({
  imports: [AuthModule, KeyModule, TradeModule, PortfolioModule],
})
export class AppModule {}
