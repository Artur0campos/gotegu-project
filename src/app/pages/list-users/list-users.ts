import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Header } from "../../_components/header/header";
import { ListItem } from "../../_components/list-item/list-item";
import { Login } from '../../services/login';
import { AddButton } from "../../_components/add-button/add-button";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [Header, ListItem, AddButton],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
})
export class ListUsers implements OnInit {

  lista_users: Array<any> = [];

  constructor(private user_services: Login, private cdr: ChangeDetectorRef, private route: Router) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.user_services.list_users().subscribe({
      next: (response) => {
        this.lista_users = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível carregar a lista de usuários.',
          icon: 'error',
          confirmButtonColor: '#3B5AC2'
        });
      }
    });
  }

  delete_user(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você deseja mesmo excluir este usuário?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.user_services.delete_uer_by_id(id).subscribe({
          next: (response) => {
            console.log(response);

            Swal.fire({
              title: 'Deletado!',
              text: 'Usuário deletado com sucesso.',
              icon: 'success',
              confirmButtonColor: '#3B5AC2'
            });

            this.carregarUsuarios();
          },
          error: (err) => {
            console.error(err);
            const errMsg = err.error?.msg || '';

            if (errMsg.includes('está inscrito')) {
              Swal.fire({
                title: 'Atenção',
                text: 'Este usuário está inscrito em um evento e não pode ser deletado!',
                icon: 'error',
                confirmButtonColor: '#3B5AC2'
              }).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire({
                title: 'Erro!',
                text: 'Erro ao tentar deletar o usuário.',
                icon: 'error',
                confirmButtonColor: '#3B5AC2'
              }).then(() => {
                window.location.reload();
              });
            }
          }
        });
      }
    });
  }

  promo(id: number) {
    this.user_services.promotion_user_by_id(id).subscribe({
      next: (response) => {
        console.log(response);

        Swal.fire({
          title: 'Promovido!',
          text: 'Usuário promovido com sucesso!',
          icon: 'success',
          confirmButtonColor: '#3B5AC2'
        });

        this.carregarUsuarios();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao promover o usuário.',
          icon: 'error',
          confirmButtonColor: '#3B5AC2'
        }).then(() => {
          window.location.reload();
        });
      }
    });
  }

  nav(){
    console.log("acionado")
    this.route.navigateByUrl('/newUser')
  }

  edit(id: number){
    console.log("id: ",id)
    this.route.navigate(['/edit', id])
  }
}