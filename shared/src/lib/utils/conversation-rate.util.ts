import { ExchangeRate } from '@shared';

export class ConversationRateUtil {
  static getConversationRate(from: ExchangeRate, to: ExchangeRate): number {
    return from.rates[to.code];
  }
}