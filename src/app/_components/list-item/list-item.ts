import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrimaryBtn } from "../primary-btn/primary-btn";
import { SecondaryBtn } from "../secondary-btn/secondary-btn";
import { AvatarBtn } from "../avatar-btn/avatar-btn";

@Component({
  selector: 'app-list-item',
  imports: [PrimaryBtn, SecondaryBtn, AvatarBtn],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  @Input() idUser!: number
  @Input() nomeUser!: string
  @Input() cpfUser!: string
  @Input() emailUser!: string
  @Input() isadmin!: any
  @Output() sAction =  new EventEmitter<void>()
  @Output() pAction = new EventEmitter<void>()
  @Output() avatarAction = new EventEmitter<void>()

  
  pclick(){
    this.pAction.emit()
  }

  sclick(){
    this.sAction.emit()
  }

  event(){
    this.avatarAction.emit() 
  }

}
