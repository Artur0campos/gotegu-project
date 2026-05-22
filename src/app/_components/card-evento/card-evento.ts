import { Component, Input } from '@angular/core';
import { PrimaryBtn } from '../primary-btn/primary-btn';

@Component({
  selector: 'app-card-evento',
  imports: [PrimaryBtn],
  templateUrl: './card-evento.html',
  styleUrl: './card-evento.css',
})
export class CardEvento {
  @Input() nome!: string
  @Input() descricao!: string
  @Input() dt_inicio!: string
}
