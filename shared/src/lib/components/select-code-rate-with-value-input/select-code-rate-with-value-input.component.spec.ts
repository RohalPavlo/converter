import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCodeRateWithValueInput } from './select-code-rate-with-value-input.component';

describe('ConvertInputComponent', () => {
  let component: SelectCodeRateWithValueInput;
  let fixture: ComponentFixture<SelectCodeRateWithValueInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCodeRateWithValueInput],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCodeRateWithValueInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
