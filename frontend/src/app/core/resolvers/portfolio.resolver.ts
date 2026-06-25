import { mockDataBinanceAccountInf } from '@/app/mockdata/portfolio';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { BinanceAccountInfResponse } from '@interfaces/api.interface';
import { PortfolioService } from '@services/portfolio.service';

export const portfolioResolver: ResolveFn<boolean> = async () => {
  console.log('data');
  const router = inject(Router);
  const portfolioService = inject(PortfolioService);
  try {
    const data: BinanceAccountInfResponse = mockDataBinanceAccountInf;
    portfolioService.setPortfolio(data);

    return true;
  } catch {
    return new RedirectCommand(router.parseUrl('/404'));
  }
};
