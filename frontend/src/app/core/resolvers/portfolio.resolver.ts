import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { PortfolioService } from '@services/portfolio.service';

export const portfolioResolver: ResolveFn<boolean> = async () => {
  console.log('data');
  const router = inject(Router);
  const portfolioService = inject(PortfolioService);
  const apiService = inject(ApiService);
  try {
    const balances = await apiService.getAccountInf();
    console.log(balances, 'balances');
    portfolioService.setPortfolio(balances);

    return true;
  } catch {
    return new RedirectCommand(router.parseUrl('/404'));
  }
};
