import { Component } from '@angular/core';
import { AvatarBtn } from '../../_components/avatar-btn/avatar-btn';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../_components/header/header';
import { CardEvento } from '../../_components/card-evento/card-evento';
import { ContainerMain } from '../../_components/container-main/container-main';
import { CardPromo } from '../../_components/card-promo/card-promo';
import { PrimaryBtn } from '../../_components/primary-btn/primary-btn';
import { FormField_ } from '../../_components/form-field/form-field';
import { Eventos } from '../../models/eventos';
import { Router } from 'express';
import { eventosService } from '../../services/eventos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, Header, CardEvento, ContainerMain, AvatarBtn, CardPromo, PrimaryBtn, FormField_, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})


export class HomePage {

  eventos_disponiveis: Array<Eventos> = [];
  mensagem: string | undefined


  constructor(

    private eventoService: eventosService
  ) { }


  ngOnInit(): void {
    this.atualizaCards()
  }

  atualizaCards(){
    this.eventoService.getEventos().subscribe({
      next: (eventos_disponiveis) => {
        this.eventos_disponiveis = eventos_disponiveis},
        error: (erro) => {
          console.log(erro)
          this.mensagem = erro.error.message
        }
      }
    )}




}

