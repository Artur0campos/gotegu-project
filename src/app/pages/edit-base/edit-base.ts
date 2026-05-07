import { Component } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../_components/header/header';
import { ContainerMain } from '../../_components/container-main/container-main';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { InputComponent } from '../../_components/input-component/input-component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-base',
  imports: [RouterOutlet, Header, ContainerMain, AvatarBtn, PrimaryBtn, FormField_,InputComponent, NgClass],
  templateUrl: './edit-base.html',
  styleUrl: './edit-base.css',
})
export class EditBase {
}
