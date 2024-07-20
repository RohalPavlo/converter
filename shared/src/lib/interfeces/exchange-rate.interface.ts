import { ExchangeRateCodes } from '../enums';

export interface ExchangeRate {
  code: ExchangeRateCodes;
  rates: Rates;
}

interface Rates {
  [key: string]: number;
}