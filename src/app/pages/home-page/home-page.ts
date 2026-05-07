import { Component } from '@angular/core';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../_components/header/header';
import { CardEvento } from '../../_components/card-evento/card-evento';
import { ContainerMain } from '../../_components/container-main/container-main';
import { CardPromo } from '../../_components/card-promo/card-promo';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { FormField_ } from '../../_components/form-field/form-field';

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, Header, CardEvento, ContainerMain, AvatarBtn, CardPromo, PrimaryBtn, FormField_],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
