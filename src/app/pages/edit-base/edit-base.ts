import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormField_ } from '../../_components/form-field/form-field';
import { Header } from '../../_components/header/header';
import { ContainerMain } from '../../_components/container-main/container-main';
import { InputComponent } from '../../_components/input-component/input-component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../../services/login';

@Component({
  selector: 'app-edit-base',
  imports: [Header, ContainerMain, FormField_, InputComponent],
  templateUrl: './edit-base.html',
  styleUrl: './edit-base.css',
})
export class EditBase implements OnInit {
  editForm!: FormGroup
  msg: string = ""
  msgClass: string = ""
  userNome: string = ""
  userEmail: string = ""
  userCpf: string = ""
  id!: number

  constructor(private fb: FormBuilder, private login_service: Login, private cdr: ChangeDetectorRef,) {
    this.editForm = this.fb.group({
      cpf: [''],
      nome: [''],
      email: ['']
    })

  }


  ngOnInit() {
    this.login_service.get_user_by_token().subscribe({
      next: (user_reponse) => {
        console.log("user_reponse :", user_reponse)
        this.userCpf = user_reponse.cpf
        this.userEmail = user_reponse.email
        this.userNome = user_reponse.nome
        this.cdr.detectChanges()
      }
    })
    this.cdr.detectChanges()
  }

  enviarEdit() {
    this.login_service.get_user_by_token().subscribe({next: (reponse) => { this.id = reponse.id}})
    const obj = this.editForm.value
    this.login_service.update_User(this.id, obj).subscribe({
      next: (reponse) => {
        console.log(reponse)
      },
      error: (err) => {
        console.log(err)
      }
    })

  }



}
