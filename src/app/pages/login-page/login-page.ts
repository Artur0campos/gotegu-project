import { Component } from '@angular/core';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { InputComponent } from '../../_components/input-component/input-component';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';

@Component({
  selector: 'app-login-page',
  imports: [AvatarBtn, InputComponent, PrimaryBtn],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

}
