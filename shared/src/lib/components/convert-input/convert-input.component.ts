import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, tap } from 'rxjs';

import { ExchangeRateCodes, RateCodeValue } from '@shared';

@UntilDestroy()
@Component({
  selector: 'lib-convert-input',
  templateUrl: './convert-input.component.html',
  styleUrl: './convert-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertInputComponent implements OnInit {
  @Output() onChange = new EventEmitter<RateCodeValue>();

  form!: FormGroup;

  readonly exchangeRateCodes = ExchangeRateCodes;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.observeControlChanges();
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
        tap(formValue => this.onChange.emit(formValue)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
