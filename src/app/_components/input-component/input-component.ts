import {
  Component,
  forwardRef,
  Input
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-input-component',
  standalone: true,

  imports: [],

  templateUrl: './input-component.html',
  styleUrl: './input-component.css',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent
  implements ControlValueAccessor {

  @Input() text: string = "label";
  @Input() placeholder: string = "text";

  value: string = '';

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  onInput(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.value = input.value;

    this.onChange(this.value);

    this.onTouched();
  }

}