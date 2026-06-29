import { PortfolioService } from '@/src/portfolio/portfolio.service';
import { AuthGuard } from '@auth/auth.guard';
import { BinanceAccountInfResponse } from '@interfaces/portfolio.interface';
import { Body, Request, Controller, UseGuards, Post, Get } from '@nestjs/common';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @UseGuards(AuthGuard)
  @Get('/account') // GET /api/v3/account
  async getAccountInf(
    @Request() req
  ): Promise<BinanceAccountInfResponse['balances']> {
    const userId = req['user'].sub;
    return this.portfolioService.getInfoByAccount(userId);
  }
}