import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from "../../_components/header/header";
import { ContainerMain } from "../../_components/container-main/container-main";
import { InputComponent } from "../../_components/input-component/input-component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { Login } from '../../services/login';
import { gerarHash, User } from '../../models/user';
import { PrimaryBtn } from "../../_components/primary-btn/primary-btn";

@Component({
  selector: 'app-creating-user',
  standalone: true,
  imports: [Header, ContainerMain, InputComponent, PrimaryBtn, ReactiveFormsModule], 
  templateUrl: './creating-user.html',
  styleUrl: './creating-user.css',
})
export class CreatingUser implements OnInit {
  msg: string = "";
  msgClass: string = "";
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private userServices: Login) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      cpf: [''],
      nome: [''],
      email: [''],
      senha: ['']
    });
  }

  criarUser() {

    if (this.userForm.invalid) {
      return;
    }

    const user: User = {
      cpf: this.userForm.get('cpf')?.value,
      nome: this.userForm.get('nome')?.value,
      email: this.userForm.get('email')?.value,
      senha: gerarHash(this.userForm.get('senha')?.value)
      
    };

    this.userServices.registration_user(user).subscribe({
      next: (response) => {
        this.msg = "Usuário cadastrado com sucesso!";
        this.msgClass = "success-message";
        this.userForm.reset();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.msg = err.error?.msg || "Erro ao realizar o cadastro.";
        this.msgClass = "error-message";
        this.cdr.detectChanges();
      }
    });
  }


}