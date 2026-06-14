import { Component, OnInit } from '@angular/core';
import { Header } from "../../_components/header/header";
import { PrimaryBtn } from "../../_components/primary-btn/primary-btn";
import { eventosService } from '../../services/eventos';
import { Eventos } from '../../models/eventos';
import { Inscricao } from '../../services/inscricao';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { inscricao_model } from '../../models/inscricao';
import { Login } from '../../services/login';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { SecondaryBtn } from "../../_components/secondary-btn/secondary-btn";

@Component({
  selector: 'app-event-resgistration',
  standalone: true,
  imports: [Header, PrimaryBtn, ReactiveFormsModule, SecondaryBtn],
  templateUrl: './event-resgistration.html',
  styleUrl: './event-resgistration.css',
})
export class EventResgistration implements OnInit {

  evento!: Eventos;
  eventoNome!: string;
  eventoDt_init!: string;
  eventoLimite!: string;
  eventoVagas!: number;
  eventoEmail!: string;
  eventoDescricao!: string;

  msg: string = "";
  msgClass: string = "";

  editEventoForm!: FormGroup;
  exibirFormulario: boolean = false;
  msgModal: string = "";
  msgModalClass: string = "";
  eventoId!: number;

  constructor(
    private eventos_service: eventosService,
    private inscricao_serivce: Inscricao,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private loginService: Login,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventoId = Number(this.route.snapshot.paramMap.get('id'));

    this.editEventoForm = this.fb.group({
      nome: [''],
      dt_inicio: [''],
      dt_fim: [''],
      descricao: [''],
      nome_responsavel: [''],
      cpf_responsavel: [''],
      email_responsavel: [''],
      numero_vagas: [0],
      dt_limite_inscricao: ['']
    });

    this.buscarDadosDoEvento();
  }

  deletarEvento() {
  const confirmar = confirm(`Tem certeza que deseja excluir o evento "${this.eventoNome}" permanentemente?`);
  
  if (confirmar) {
    this.eventos_service.delete_evenmt_by_id(this.eventoId).subscribe({
      next: (response) => {
        alert("Evento excluído com sucesso!");
        // Redireciona o usuário de volta para a lista geral de eventos
        this.router.navigateByUrl('/eventos'); 
      },
      error: (err) => {
        console.error("Erro ao deletar o evento:", err);
        alert("Não foi possível excluir o evento.");
      }
    });
  }
}

  buscarDadosDoEvento() {
    this.eventos_service.getEventosById(this.eventoId).subscribe({
      next: (evento) => {
        this.evento = evento;
        this.eventoNome = this.evento?.nome;
        this.eventoDt_init = this.evento?.dt_inicio;
        this.eventoLimite = this.evento?.dt_limite_inscricao;
        this.eventoVagas = this.evento?.numero_vagas;
        this.eventoEmail = this.evento?.email_responsavel;
        this.eventoDescricao = this.evento?.descricao;

        // Formata as datas vindas no padrão brasileiro (DD/MM/AAAA) para o padrão HTML (YYYY-MM-DD)
        const eventoFormatadoParaForm = {
          ...evento,
          dt_inicio: this.formatarParaDataISO(evento.dt_inicio),
          dt_fim: this.formatarParaDataISO(evento.dt_fim),
          dt_limite_inscricao: this.formatarParaDataISO(evento.dt_limite_inscricao)
        };

        this.editEventoForm.patchValue(eventoFormatadoParaForm);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  alternarFormulario() {
    this.exibirFormulario = !this.exibirFormulario;
    this.msgModal = "";
  }

  formatarParaDataISO(dataBR: string): string {
    if (!dataBR) return '';
    const apenasData = dataBR.split(' ')[0];

    if (!apenasData.includes('/')) return dataBR;
    const [dia, mes, ano] = apenasData.split('/');
    return `${ano}-${mes}-${dia}`;
  }

formatarParaDataBR(dataISO: string): string {
  if (!dataISO) return '';
  const apenasData = dataISO.trim().split(/[ T]/)[0];
  
  if (!apenasData.includes('-')) return dataISO;

  const [ano, mes, dia] = apenasData.split('-');
  return `${dia}/${mes}/${ano}`;
}

  enviarEdit() {
    const dadosForm = this.editEventoForm.value;
    const dtInicioFormatada = this.formatarParaDataBR(dadosForm.dt_inicio);
    const dtFimFormatada = this.formatarParaDataBR(dadosForm.dt_fim);
    const dtLimiteFormatada = this.formatarParaDataBR(dadosForm.dt_limite_inscricao);

    const eventoCompleto = {
      ...this.evento,
      ...dadosForm,
      dt_inicio: dtInicioFormatada,
      dt_fim: dtFimFormatada,
      dt_limite_inscricao: dtLimiteFormatada
    };
    const { id, ...dadosSemId } = eventoCompleto;

    console.log("Dados que estão indo para o servidor:", dadosSemId);

    this.eventos_service.update_event_by_id(this.eventoId, dadosSemId).subscribe({
      next: (response) => {
        this.msgModal = "Alterações feitas com sucesso!";
        this.msgModalClass = "success-message";
        this.buscarDadosDoEvento();

        setTimeout(() => {
          this.alternarFormulario();
        }, 1500);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.msgModal = "Erro ao salvar alterações";
        this.msgModalClass = "error-message";
        this.cdr.detectChanges();
      }
    });
  }

  inscrever() {
    this.loginService.get_user_by_token().subscribe({
      next: (response) => {
        const userId = response.id;
        const inscricao = new inscricao_model(this.evento.id, userId);
        this.inscricao_serivce.post_inscricao(inscricao).subscribe({
          next: (res) => {
            this.msg = "Usuário cadastrado com sucesso!";
            this.msgClass = 'success-message';
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.log(err);
            const erroMsg = err.error.msg;
            if (erroMsg && erroMsg.includes('já está inscrito')) {
              this.msg = 'Usuário já está inscrito !';
              this.msgClass = 'error-message';
            } else {
              this.msg = 'Erro ao inscrever usuário';
              this.msgClass = 'error-message';
            }
            this.cdr.detectChanges();
          }
        });
      }
    });
  }
}