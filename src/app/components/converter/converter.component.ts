import { Component, OnInit } from '@angular/core';
import { CalculateExchangeRateUtil, ExchangeRate, RateCodeValue } from '@shared';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, filter, tap, withLatestFrom } from 'rxjs';

import { ExchangeRatesService } from '../../services';

@UntilDestroy()
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent implements OnInit {
  form!: FormGroup;

  get firstInput() {
    return this.form.controls['firstInput'];
  }

  get secondInput() {
    return this.form.controls['secondInput'];
  }

  constructor(private exchangeRatesService: ExchangeRatesService) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.observeControlChanges();
  }

  private initializeFormGroup(): void {
    this.form = new FormGroup({
      firstInput: new FormControl<RateCodeValue>({ code: null, value: null }),
      secondInput: new FormControl<RateCodeValue>({ code: null, value: null })
    })
  }

  private observeControlChanges(): void {
    this.observeFieldChanges(this.firstInput, this.secondInput);
    this.observeFieldChanges(this.secondInput, this.firstInput);
  }

  private observeFieldChanges(leadField: AbstractControl, untouchedField: AbstractControl): void {
    combineLatest([leadField.valueChanges, this.exchangeRatesService.currencyExchangeRates$])
      .pipe(
        filter(([leadField, exchangeRate]) => leadField.code && exchangeRate),
        tap(([leadField, exchangeRate]) => {
          const untouchedFieldCode = untouchedField.value.code;

          if (leadField.value && untouchedFieldCode && exchangeRate) {
            const value = CalculateExchangeRateUtil.calculateExchangeRate(
              exchangeRate[leadField.code],
              exchangeRate[untouchedFieldCode],
              leadField.value
            );

            untouchedField.patchValue({ code: untouchedFieldCode, value }, { emitEvent: false });
            untouchedField.markAsTouched();
          }
        }),
        untilDestroyed(this)

      )
      .subscribe();
  }
}
