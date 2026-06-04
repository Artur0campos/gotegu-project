import { ChangeDetectorRef, Component } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { Header } from '../../_components/header/header';
import { ContainerMain } from '../../_components/container-main/container-main';
import { InputComponent } from '../../_components/input-component/input-component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { gerarHash, User } from '../../models/user';
import { Login } from '../../services/login';

@Component({
  selector: 'app-edit-base',
  imports: [Header, ContainerMain, FormField_, InputComponent],
  templateUrl: './edit-base.html',
  styleUrl: './edit-base.css',
})
export class EditBase {

  editForm = new FormGroup({
    cpf: new FormControl(),
    nome: new FormControl(),
    senha: new FormControl(),
    email: new FormControl()
  });

  msg: string = ""
  msgClass: string = ""

  constructor(private ft: FormBuilder, private login_service: Login, private cdr: ChangeDetectorRef) {
  }


  ngOnInit() {
    const cpf_user = sessionStorage.getItem('cpf_usuario_participante')
    console.log("cpf user:", cpf_user)
    this.login_service.list_users().subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(
          (user: User) => user.cpf === cpf_user
        )
        if (!usuario) {
          setTimeout(() => {
            this.msg = 'Usuário não encontrado';
            this.msgClass = 'error-message';
          });

          return;
        }

        this.editForm.patchValue({
          cpf: usuario.cpf,
          nome: usuario.nome,
          email: usuario.email,
          senha: ''
        })

        console.log(this.editForm.value)
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

  enviarEdit() {
    const user: User = Object.assign(this.editForm.value)
    console.log(this.editForm.value)
    console.log("user",user)
    if (user.cpf != '1234') {
      console.log("user",user)
      user.senha = gerarHash(user.senha)
    }
    
    this.login_service.update_User(Number(sessionStorage.getItem('id_usuario_participante')), user).subscribe({
      next: (reponse) => {
        console.log(reponse)
        this.msg = "Usuário editado com sucesso!"
        this.msgClass = 'success-message'
      },
      error: (err) => {
        console.log(err)
        this.msg = 'Erro ao editar usuário!';
        this.msgClass = 'error-message';
      }
    })

  }



}
