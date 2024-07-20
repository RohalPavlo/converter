import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_EXCHANGE_RATE_API } from '../../constants/constants';
import { ExchangeRateCodes } from '../../enums';
import { ExchangeRate } from '../../interfeces';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesApiService {

  constructor(private http: HttpClient) {}

  getExchangeRateByCode(code: ExchangeRateCodes): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(`${BASE_EXCHANGE_RATE_API}${code}`);
  }
}
