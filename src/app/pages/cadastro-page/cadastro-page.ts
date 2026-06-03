import { Component } from '@angular/core';
import { InputComponent } from '../../_components/input-component/input-component';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { gerarHash, User } from '../../models/user';
import { Login } from '../../services/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-page',
  imports: [InputComponent, PrimaryBtn,
    ReactiveFormsModule],
  templateUrl: './cadastro-page.html',
  styleUrl: './cadastro-page.css',
})
export class CadastroPage {

  userForm: FormGroup;
  msg: string = ""
  msgClass: string = ""

  constructor(private fb: FormBuilder, private loginService: Login, private route: Router) {

    this.userForm = this.fb.group({
      cpf: [''],
      nome: [''],
      email: [''],
      senha: ['']
    });

  }

  cadastro_user() {
    const user: User = this.userForm.value
    user.senha = gerarHash(user.senha)
    console.log(user)
    this.loginService.registration_user(user).subscribe({
      next: (response) => {
        console.log(response)
        this.msg = "Usuário cadastrado com sucesso!"
        this.msgClass = 'success-message'
      }, error: (err) => {
        console.log(err)
        this.msg =
          'Erro ao cadastrar usuário';

        this.msgClass = 'error-message';

      }


    })



  }




}
