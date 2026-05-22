import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Eventos } from '../models/eventos';

@Injectable({
  providedIn: 'root',
})
export class eventosService {
  private eventosUrl = 'http://localhost:8080/api/v1/evento';
  private headers = new HttpHeaders({ Authorization: 'tokenJWT' })

  constructor(private http: HttpClient) {

  }


  getEventos(): Observable<Eventos[]> {
    return this.http.get<Eventos[]>(`${this.eventosUrl}`, { "headers": this.headers }).pipe(
      map((eventos: Eventos[]) => eventos)
    );
  }

  
}
