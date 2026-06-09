import { Component, inject } from '@angular/core';
import { Header } from "../../_components/header/header";
import { PrimaryBtn } from "../../_components/primary-btn/primary-btn";
import { eventosService } from '../../services/eventos';
import { Eventos } from '../../models/eventos';
import { Inscricao } from '../../services/inscricao';
import { ActivatedRoute, } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { inscricao_model } from '../../models/inscricao';
import { Login } from '../../services/login';

@Component({
  selector: 'app-event-resgistration',
  imports: [Header, PrimaryBtn],
  templateUrl: './event-resgistration.html',
  styleUrl: './event-resgistration.css',
})
export class EventResgistration {

  evento!: Eventos
  eventoNome!: string
  eventoDt_init!: string
  eventoLimite!: string
  eventoVagas!: number
  eventoEmail!: string
  eventoDescricao!: string
  msg: string = ""
  msgClass: string = ""


  constructor(private eventos_service: eventosService, private inscricao_serivce: Inscricao, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private loginService: Login) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.eventos_service.getEventosById(id).subscribe({
      next: (evento) => {
        this.evento = evento
        this.eventoNome = this.evento?.nome
        this.eventoDt_init = this.evento?.dt_inicio
        this.eventoLimite = this.evento?.dt_limite_inscricao
        this.eventoVagas = this.evento?.numero_vagas
        this.eventoEmail = this.evento?.email_responsavel
        this.eventoDescricao = this.evento?.descricao
        console.log(evento)
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.log(error)
      }
    })


  }

  inscrever() {
    this.loginService.get_user_by_token().subscribe({
      next: (response) => {
        const userId = response.id
        const inscricao = new inscricao_model(this.evento.id, userId)
        this.inscricao_serivce.post_inscricao(inscricao).subscribe({
          next: (response) => {
            console.log(response)
            this.msg = "Usuário cadastrado com sucesso!"
            this.msgClass = 'success-message'
            this.cdr.detectChanges()
          }, error: (err) => {
            console.log(err)
            const msg = err.error.msg
            if (msg.includes('já está inscrito')) {
              this.msg = 'Usuário já está inscrito !';
              this.msgClass = 'error-message';
              this.cdr.detectChanges()
            } else {
              this.msg = 'Erro ao inscrever usuário';
              this.msgClass = 'error-message';
              this.cdr.detectChanges()
            }

          }
        })
        
      }

    })


  }


}
