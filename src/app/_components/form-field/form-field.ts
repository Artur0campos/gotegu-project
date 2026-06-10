import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryBtn } from '../primary-btn/primary-btn';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-field',
  imports: [CommonModule, PrimaryBtn, ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField_ {
  @Input() text_title: string = 'Titulo'
  @Input() showDeleteButton: boolean=false
  @Input() icon: string="ph ph-plus"
  @Input() text_btn: string=""
  @Output() btnAction = new EventEmitter<void>();
  @Input() formGroup!: FormGroup
  
  onClick() {
    this.btnAction.emit();
  }
}