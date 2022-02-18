import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true,
};

@Component({
  selector: 'app-workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR],
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors = ['strength', 'endurance'];

  value?: string;

  constructor() {}

  private onModelChange: Function = (value: string) => {};
  private onTouch?: Function;

  setSelected(value: string) {
    this.value = value;
    this.onModelChange(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }
}
