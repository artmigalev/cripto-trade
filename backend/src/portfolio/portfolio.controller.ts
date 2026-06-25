import { PortfolioService } from '@/src/portfolio/portfolio.service';
import { AuthGuard } from '@auth/auth.guard';
import { Body, Request, Controller, UseGuards, Post, Get } from '@nestjs/common';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @UseGuards(AuthGuard)
  @Get('/account') // GET /api/v3/account
  async getAccountInf(
    @Request() req
  ) {
    const userId = req['user'].sub;
    return this.portfolioService.getInfoByAccount(userId);
  }
}