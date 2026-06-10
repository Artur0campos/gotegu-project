import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-btn',
  imports: [],
  templateUrl: './secondary-btn.html',
  styleUrl: './secondary-btn.css',
})
export class SecondaryBtn {

  @Input() text: string = 'deletar';
  @Input() icon: string="ph ph-trash"

  @Output() sbtnClick = new EventEmitter<void>();

  onClick() {
    this.sbtnClick.emit();
  }

}
