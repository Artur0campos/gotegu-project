import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrimaryBtn } from "../primary-btn/primary-btn";
import { SecondaryBtn } from "../secondary-btn/secondary-btn";

@Component({
  selector: 'app-list-item',
  imports: [PrimaryBtn, SecondaryBtn],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  @Input() idUser!: number
  @Input() nomeUser!: string
  @Input() cpfUser!: string
  @Input() emailUser!: string
  @Input() isadmin!: number
  @Output() sAction =  new EventEmitter<void>()
  @Output() pAction = new EventEmitter<void>()

  
  pclick(){
    this.pAction.emit()
  }

  sclick(){
    this.sAction.emit()
  }

}
