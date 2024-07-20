import { Component } from '@angular/core';
import { ExchangeRatesService } from '../../services/exchange-rates.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers: [ExchangeRatesService]
})
export class MainPageComponent {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

}
