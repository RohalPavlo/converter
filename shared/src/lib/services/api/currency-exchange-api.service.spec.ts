import { TestBed } from '@angular/core/testing';

import { ExchangeRatesApiService } from './exchange-rates-api.service';

describe('CurrencyExchangeApiService', () => {
  let service: ExchangeRatesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeRatesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
