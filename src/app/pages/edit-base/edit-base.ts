import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { Header } from '../../_components/header/header';
import { ContainerMain } from '../../_components/container-main/container-main';
import { InputComponent } from '../../_components/input-component/input-component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../services/login';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-base',
  imports: [Header, ContainerMain, FormField_, InputComponent, ReactiveFormsModule],
  templateUrl: './edit-base.html',
  styleUrl: './edit-base.css',
})
export class EditBase implements OnInit {
  editForm!: FormGroup
  msg: string = ""
  msgClass: string = ""
  id!: number
  idParam!: any

  constructor(private login_service: Login, private cdr: ChangeDetectorRef, private routeAct: ActivatedRoute) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      cpf: new FormControl(''),
      nome: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl('')
    })
    this.idParam = this.routeAct.snapshot.paramMap.get('id')
    console.log("idparam: ", this.idParam)
    if (this.idParam) {
      this.login_service.list_users().subscribe({
        next: (lista_of_users) => {
          console.log("lista de users: ", lista_of_users)
          for (const user of lista_of_users) {
            console.log("user.id", user.id)
            console.log("user :", user)
            if (user.id == this.idParam) {
              this.editForm.patchValue(user)
              this.cdr.detectChanges()
            }
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    else {
      this.login_service.get_user_by_token().subscribe({
        next: (user_reponse: any) => {
          console.log("user_reponse :", user_reponse)
          this.id = user_reponse.id
          console.log("id: ", this.id)
          console.log("Objeto do formulário que está sendo enviado:", user_reponse)
          this.editForm.patchValue(user_reponse)
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log("erro ao buscar usuario: ", err)
        }
      })
    }



  }

  enviarEdit() {

    const obj = this.editForm.value

    if (this.idParam) {
      this.login_service.update_User(this.idParam, obj).subscribe({
        next: (reponse) => {
          console.log("reposta: ", reponse)
          this.msg = "Alterações feitas com sucesso!"
          this.msgClass = "success-message"
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log("resposta erro: ", err)
          this.msg = "Erro ao salvar alterações"
          this.msgClass = "error-message"
          this.cdr.detectChanges()
        }
      })
    }
    else {
      this.login_service.update_User(this.id, obj).subscribe({
        next: (reponse) => {
          console.log("reposta: ", reponse)
          this.msg = "Alterações feitas com sucesso!"
          this.msgClass = "success-message"
          this.cdr.detectChanges()
        },
        error: (err) => {
          console.log("resposta erro: ", err)
          this.msg = "Erro ao salvar alterações"
          this.msgClass = "error-message"
          this.cdr.detectChanges()
        }
      })
    }
  }



}
