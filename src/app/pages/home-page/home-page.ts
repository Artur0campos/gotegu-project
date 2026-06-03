import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from '../../_components/header/header';
import { CardEvento } from '../../_components/card-evento/card-evento';
import { ContainerMain } from '../../_components/container-main/container-main';
import { CardPromo } from '../../_components/card-promo/card-promo';
import { Eventos } from '../../models/eventos';
import { eventosService } from '../../services/eventos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [Header, CardEvento, ContainerMain, CardPromo, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})


export class HomePage {

  eventos_disponiveis: Array<Eventos> = [];
  mensagem: string | undefined


  constructor(

    private eventoService: eventosService,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.atualizaCards()
  }


  atualizaCards() {
    this.eventoService.getEventos().subscribe({
      next: (eventos_disponiveis) => {
        console.log(eventos_disponiveis)
        this.eventos_disponiveis = eventos_disponiveis
        this.cdr.detectChanges()
      },
      error: (erro) => {
        console.log(erro)
        this.mensagem = erro.error.message
      }
    }
    )
  }




}

