import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  forwardRef,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, tap } from 'rxjs';

import { ExchangeRateCodes, RateCodeValue } from '@shared';

@UntilDestroy()
@Component({
  selector: 'select-code-rate-with-value-input',
  templateUrl: './select-code-rate-with-value-input.component.html',
  styleUrl: './select-code-rate-with-value-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCodeRateWithValueInput),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectCodeRateWithValueInput implements OnInit, ControlValueAccessor {
  form!: FormGroup;

  private onTouched!: () => {};
  private onChanged!: (value: RateCodeValue) => {};

  readonly exchangeRateCodes = ExchangeRateCodes;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.observeControlChanges();
  }

  writeValue(value: RateCodeValue): void {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private initializeFormGroup(): void {
    this.form = this.fb.group({
      code: new FormControl(null),
      value: new FormControl(null)
    });
  }

  private observeControlChanges(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(200),
        tap(formValue => {
          this.onTouched();
          this.onChanged(formValue);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
