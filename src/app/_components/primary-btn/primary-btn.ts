import { Component, Input } from '@angular/core';
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
}