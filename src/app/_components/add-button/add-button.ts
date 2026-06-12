import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  imports: [],
  templateUrl: './add-button.html',
  styleUrl: './add-button.css',
})
export class AddButton {

  @Output() addClick = new EventEmitter<void>()

  addUser(){
    this.addClick.emit()
  }


}
