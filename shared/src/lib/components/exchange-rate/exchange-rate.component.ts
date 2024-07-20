import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConversationRateUtil, ExchangeRate } from '@shared';

@Component({
  selector: 'lib-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrl: './exchange-rate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeRateComponent {
  @Input() from!: ExchangeRate;
  @Input() to!: ExchangeRate;

  get rate(): number | null {
    return (this.from && this.to) ? ConversationRateUtil.getConversationRate(this.from, this.to) : null;
  }
}
