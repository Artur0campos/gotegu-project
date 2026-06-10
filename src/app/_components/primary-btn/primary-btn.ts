import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [NgClass],
  templateUrl: './primary-btn.html',
  styleUrl: './primary-btn.css',
})
export class PrimaryBtn {
  @Input() text: string = 'participar';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() icon: string="ph ph-plus"

  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    this.btnClick.emit();
  }
}