import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./_components/header/header";
import { CardEvento } from "./_components/card-evento/card-evento";
import { ContainerMain } from "./_components/container-main/container-main";
import { AvatarBtn } from "./_components/avatar-btn/avatar-btn";
import { CardPromo } from './_components/card-promo/card-promo';
import { PrimaryBtn } from './_components/primary-btn/primary-btn';
import { FormField_ } from './_components/form-field/form-field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CardEvento, ContainerMain, AvatarBtn, CardPromo, PrimaryBtn, FormField_],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gotegu-project');
}
