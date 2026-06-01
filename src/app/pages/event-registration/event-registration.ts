import { Component } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { Header } from '../../_components/header/header';
import { ContainerMain } from '../../_components/container-main/container-main';
import { InputComponent } from '../../_components/input-component/input-component';

@Component({
  selector: 'app-event-registration',
  imports: [ Header, ContainerMain, AvatarBtn, FormField_, InputComponent],
  templateUrl: './event-registration.html',
  styleUrl: './event-registration.css',
})
export class EventRegistration {

}
