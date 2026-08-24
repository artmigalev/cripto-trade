import { Inject, Module } from '@nestjs/common';
import { AuthModule } from '@/src/auth/auth.module';
import { KeyModule } from './key/key.module';
import { TradeModule } from '@/src/trade/trade.module';
import { PortfolioModule } from '@/src/portfolio/portfolio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:  join(process.cwd(), 'enviroment', `.env.${process.env.NODE_ENV || 'development'}`),
      isGlobal: true,
    }),
    AuthModule,
    KeyModule,
    TradeModule,
    PortfolioModule,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get<string>('FRONTEND_URL'));
    console.log('NODE_ENV:', process.env.NODE_ENV);
  }
}
