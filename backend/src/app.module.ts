import { Module } from '@nestjs/common';
import { AuthModule } from '@/src/auth/auth.module';
import { KeyModule } from './key/key.module';

@Module({
  imports: [AuthModule, KeyModule],
})
export class AppModule {}
