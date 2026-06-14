import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddButton } from "../../_components/add-button/add-button";
import { Header } from "../../_components/header/header";
import { ContainerMain } from "../../_components/container-main/container-main";
import { eventosService } from '../../services/eventos';
import { CardEvento } from "../../_components/card-evento/card-evento";
import { Eventos } from '../../models/eventos';

@Component({
  selector: 'app-eventos-edit-page',
  standalone: true,
  imports: [AddButton, Header, ContainerMain, CardEvento, ReactiveFormsModule],
  templateUrl: './eventos-edit-page.html',
  styleUrl: './eventos-edit-page.css',
})
export class EventosEditPage implements OnInit {

  list_of_events: Array<any> = [];
  exibirFormulario: boolean = false;
  eventoForm!: FormGroup;

  constructor(
    private evento_service: eventosService, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.carregarEventos();
    
    this.eventoForm = this.fb.group({
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
  }

  carregarEventos() {
    this.evento_service.getEventos().subscribe({
      next: (reponse) => {
        this.list_of_events = reponse;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  alternarFormulario() {
    this.exibirFormulario = !this.exibirFormulario;
    if (!this.exibirFormulario) {
      this.eventoForm.reset();
    }
  }

  formatarDataParaBR(dataISO: string): string {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

  criarEvento() {
    if (this.eventoForm.invalid) {
      return;
    }
    const novoEvento: Eventos = this.eventoForm.value;
    
    novoEvento.dt_fim = this.formatarDataParaBR(this.eventoForm.value.dt_fim)
    novoEvento.dt_inicio = this.formatarDataParaBR(this.eventoForm.value.dt_inicio)
    novoEvento.dt_limite_inscricao = this.formatarDataParaBR(this.eventoForm.value.dt_limite_inscricao)

    this.evento_service.create_event(novoEvento).subscribe({
      next: (response) => {
        console.log("Evento criado com sucesso:", response);
        this.alternarFormulario();
        this.carregarEventos();
      },
      error: (err) => {
        console.error("Erro ao criar evento:", err);
      }
    });
  }
}