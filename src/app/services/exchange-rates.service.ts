import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ExchangeRatesApiService, ExchangeRate, ExchangeRateCodes } from '@shared';

@UntilDestroy()
@Injectable()
export class ExchangeRatesService {
  private currencyExchangeRatesSubject = new BehaviorSubject<{ [key: string]: ExchangeRate } | null>(null);
  public currencyExchangeRates$ = this.currencyExchangeRatesSubject.asObservable();

  constructor(private exchangeRatesApiService: ExchangeRatesApiService) {
    this.observeCurrentExchangeRatesChanges();
  }

  private observeCurrentExchangeRatesChanges(): void {
    forkJoin([
      this.exchangeRatesApiService.getExchangeRateByCode(ExchangeRateCodes.UAH),
      this.exchangeRatesApiService.getExchangeRateByCode(ExchangeRateCodes.EUR),
      this.exchangeRatesApiService.getExchangeRateByCode(ExchangeRateCodes.USD)
    ])
      .pipe(
        map((rates) => rates.map((rate: any) => {
          return { code: rate.base_code, rates: rate.conversion_rates } as ExchangeRate;
        })),
        map(([UAH, EUR, USD]) => ({ UAH, EUR, USD })),
        tap(exchangeRates => {
          this.currencyExchangeRatesSubject.next(exchangeRates);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
