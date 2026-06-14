import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Eventos } from '../models/eventos';



@Injectable({
  providedIn: 'root',
})
export class eventosService {

  private eventosUrl = 'http://localhost:8080/api/v1/evento';

  constructor(private http: HttpClient) {

  }


  getEventos(): Observable<Eventos[]> {
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.get<Eventos[]>(`${this.eventosUrl}`, { "headers": headers })
  }

  getEventosById(id: number): Observable<Eventos> {
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.get<Eventos>(`${this.eventosUrl}/${id}`, { "headers": headers })
  }

  create_event(evento: Eventos): Observable<any> {
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.post<any>(`${this.eventosUrl}`, evento, { "headers": headers })
  }

  delete_evenmt_by_id(id: number): Observable<any> {
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.delete<any>(`${this.eventosUrl}/${id}`, { "headers": headers })
  }

    update_event_by_id(id: number): Observable<any> {
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.delete<any>(`${this.eventosUrl}/${id}`, { "headers": headers })
  }

}
