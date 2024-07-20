import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCodeRateWithValueInput, ExchangeRateComponent } from './components';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  ExchangeRateComponent,
  SelectCodeRateWithValueInput
];

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedModule {}
