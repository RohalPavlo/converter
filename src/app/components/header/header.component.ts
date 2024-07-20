import { Component } from '@angular/core';

import { ExchangeRateCodes } from '@shared';

import { ExchangeRatesService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  exchangeRates$ = this.exchangeRatesService.currencyExchangeRates$;

  readonly exchangeRateCodes = ExchangeRateCodes;

  constructor(private exchangeRatesService: ExchangeRatesService) {}
}
