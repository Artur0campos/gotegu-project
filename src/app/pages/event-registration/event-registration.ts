import { Component } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../_components/header/header';
import { CardEvento } from '../../_components/card-evento/card-evento';
import { ContainerMain } from '../../_components/container-main/container-main';
import { CardPromo } from '../../_components/card-promo/card-promo';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';

@Component({
  selector: 'app-event-registration',
  imports: [RouterOutlet, Header, ContainerMain, AvatarBtn, PrimaryBtn, FormField_],
  templateUrl: './event-registration.html',
  styleUrl: './event-registration.css',
})
export class EventRegistration {

}
