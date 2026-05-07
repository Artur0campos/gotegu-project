import { Component, Input } from '@angular/core';
import { InputComponent } from '../input-component/input-component';
import { PrimaryBtn } from '../primary-btn/primary-btn';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-field',
  imports: [CommonModule,InputComponent, PrimaryBtn],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField_ {
  @Input() text_title: string = 'Titulo'
  @Input() showDeleteButton: boolean=false
}
