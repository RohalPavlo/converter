import { ExchangeRate } from '../interfeces';
import { ConversationRateUtil } from './conversation-rate.util';

export class CalculateExchangeRateUtil {
  static calculateExchangeRate(from: ExchangeRate, to: ExchangeRate, value: number): number {
    const conversationRate = ConversationRateUtil.getConversationRate(from, to);
    const calculatedValue = +(conversationRate * value);

    if (typeof calculatedValue === 'number') {
      return +calculatedValue.toFixed(2)
    }

    return 0;
  }
}