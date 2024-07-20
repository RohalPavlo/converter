import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, interval, map, switchMap, tap, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ExchangeRatesApiService, ExchangeRate, ExchangeRateCodes } from '@shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@UntilDestroy()
@Injectable()
export class ExchangeRatesService {
  private currencyExchangeRatesSubject = new BehaviorSubject<{ [key: string]: ExchangeRate } | null>(null);
  public currencyExchangeRates$ = this.currencyExchangeRatesSubject.asObservable();

  constructor(
    private exchangeRatesApiService: ExchangeRatesApiService,
    private snackBar: MatSnackBar
  ) {
    this.observeCurrentExchangeRatesChanges();
  }

  private observeCurrentExchangeRatesChanges(): void {
    timer(0 ,60000)
      .pipe(
        switchMap(() => forkJoin([
          this.exchangeRatesApiService.getExchangeRateByCode(ExchangeRateCodes.UAH),
          this.exchangeRatesApiService.getExchangeRateByCode(ExchangeRateCodes.EUR),
          this.exchangeRatesApiService.getExchangeRateByCode(ExchangeRateCodes.USD)
        ])),
        map((rates) => rates.map((rate: any) => {
          return { code: rate.base_code, rates: rate.conversion_rates } as ExchangeRate;
        })),
        map(([UAH, EUR, USD]) => ({ UAH, EUR, USD })),
        tap(exchangeRates => {
          this.currencyExchangeRatesSubject.next(exchangeRates);
          this.snackBar.open('Exchange rates updated', undefined, { duration: 3000 });
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
