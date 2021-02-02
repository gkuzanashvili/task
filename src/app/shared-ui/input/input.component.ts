import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  providers: [INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements ControlValueAccessor {

  public value: string;
  public changed: (value?: any) => void;
  public touched: (event?: any) => void;


  @Input() label: string;
  @Input() icon: string;
  @Input() isDisabled: boolean;
  @Input() inputType = 'text';
  @Input() checkValidity: boolean;
  @Input() errors: any;


  constructor() {
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
