import { ExchangeRateCodes } from '@shared';

export interface ConversationRate {
  from: ExchangeRateCodes;
  to: ExchangeRateCodes;
  rate: number;
}