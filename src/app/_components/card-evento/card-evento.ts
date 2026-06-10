import { Component, Input } from '@angular/core';
import { PrimaryBtn } from '../primary-btn/primary-btn';
import { Router } from '@angular/router';
import { Eventos } from '../../models/eventos';

@Component({
  selector: 'app-card-evento',
  imports: [PrimaryBtn],
  templateUrl: './card-evento.html',
  styleUrl: './card-evento.css',
  standalone: true
})
export class CardEvento {
  @Input() nome!: string
  @Input() descricao!: string
  @Input() dt_inicio!: string
  @Input() evento!: Eventos
  

  constructor(private route:Router,){}

  go_to_register(){
    console.log(this.evento)
    this.route.navigate(['/eventRegistration', this.evento?.id])
    }
}
