import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { portfolioResolver } from './portfolio.resolver';

describe('portfolioResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      portfolioResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
