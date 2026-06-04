import { Component } from '@angular/core';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { InputComponent } from '../../_components/input-component/input-component';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { gerarHash, UserLogin } from '../../models/user';
import { Login } from '../../services/login';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [InputComponent, PrimaryBtn,
    ReactiveFormsModule, CommonModule,],
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
    if (user.cpf != '1234') {
      user.senha = gerarHash(user.senha)
    }

    this.loginService.authentication(user).subscribe({
      next: (response) => {
        console.log(response)
        sessionStorage.setItem('token_jwt', response.token_jwt)
        console.log(sessionStorage.getItem('token_jwt'))

        this.loginService.list_users().subscribe({
          next: (usuarios) => {

            const usuario = usuarios.find(
              (user: UserLogin) => user.cpf === this.userForm.value.cpf
            );

            if (usuario) {
              sessionStorage.setItem(
                'id_usuario_participante',
                usuario.id.toString()
              )
              sessionStorage.setItem('cpf_usuario_participante', usuario.cpf.toString())

              console.log('ID salvo:', usuario.id);
            } else {
              console.log('Usuário não encontrado');
            }

          },
          error: (err) => {
            console.log(err);
          }

        })

        this.route.navigateByUrl('/homePage')
      },
      error: (err) => {
        console.log(err)
        this.msg =
          'Erro ao logar usuário';

        this.msgClass = 'error-message';

      }
    })
  }
}
