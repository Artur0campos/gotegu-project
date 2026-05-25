import { Component } from '@angular/core';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { InputComponent } from '../../_components/input-component/input-component';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserLogin} from '../../models/user';
import { Login } from '../../services/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [AvatarBtn, InputComponent, PrimaryBtn,
    ReactiveFormsModule,],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  userForm: FormGroup;
  msg: string = ""
  msgClass: string = ""

  constructor(private fb: FormBuilder, private loginService: Login, private route: Router) {

    this.userForm = this.fb.group({
      cpf: [''],
      senha: ['']
    });

  }

  cadastro_user() {
    const user: UserLogin = this.userForm.value
    console.log(user)
    this.loginService.authentication(user).subscribe({
      next: (response) => {
        console.log(response)
        this.route.navigateByUrl('/homePage')
      }, error: (err) => {
        console.log(err)
        this.msg =
          'Erro ao logar usuário';

        this.msgClass = 'error-message';

      }


    })



  }




}
