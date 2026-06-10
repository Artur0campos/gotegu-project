import { ChangeDetectorRef, Component } from '@angular/core';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { InputComponent } from '../../_components/input-component/input-component';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  userForm!: FormGroup;
  msg: string = ""
  msgClass: string = ""

  constructor(private loginService: Login, private route: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  cadastro_user() {
    if (this.userForm.invalid) {
      this.msg = 'Por favor, preencha todos os campos corretamente.';
      this.msgClass = 'error-message'; 
      return;
    }
    const user: UserLogin = this.userForm.value
    if (user.cpf != '1234') {
      user.senha = gerarHash(user.senha)
    }

    this.loginService.authentication(user).subscribe({
      next: (response) => {
        console.log(response)
        sessionStorage.setItem('token_jwt', response.token_jwt)
        console.log(sessionStorage.getItem('token_jwt'))
        this.route.navigateByUrl('/homePage')
      },
      error: (err) => {
        console.log(err)
        this.msg =
          'Erro ao logar usuário';
        this.msgClass = 'error-message';
        this.cdr.detectChanges()

      }
    })
  }
}
