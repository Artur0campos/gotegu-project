import { ChangeDetectorRef, Component } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { Header } from '../../_components/header/header';
import { ContainerMain } from '../../_components/container-main/container-main';
import { InputComponent } from '../../_components/input-component/input-component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gerarHash, User } from '../../models/user';
import { Login } from '../../services/login';

@Component({
  selector: 'app-edit-base',
  imports: [Header, ContainerMain, FormField_, InputComponent],
  templateUrl: './edit-base.html',
  styleUrl: './edit-base.css',
})
export class EditBase {
  editForm: FormGroup
  msg: string = ""
  msgClass: string = ""

  constructor(private ft: FormBuilder, private login_service: Login) {
    this.editForm = this.ft.group({
      cpf: [''],
      nome: [''],
      senha: [''],
      email: [''],
    })
  }


  ngOnInit() {
    console.log("edit base executado!")
  }

  enviarEdit() {
    const user: User = this.editForm.value
    if (user.cpf != '1234') {
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
