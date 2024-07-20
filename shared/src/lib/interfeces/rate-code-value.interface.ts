import { ExchangeRateCodes } from '@shared';

export interface RateCodeValue {
  code: ExchangeRateCodes | null;
  value: number | null;
}