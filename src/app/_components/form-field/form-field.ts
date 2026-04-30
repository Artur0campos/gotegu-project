import { Component, Input } from '@angular/core';
import { InputComponent } from '../input-component/input-component';
import { PrimaryBtn } from '../primary-btn/primary-btn';


@Component({
  selector: 'app-form-field',
  imports: [InputComponent, PrimaryBtn],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField_ {
  @Input() text: string = 'Titulo'
}
