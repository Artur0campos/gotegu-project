import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inscricao_model } from '../models/inscricao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Inscricao {
  private inscricaoUrl = "http://localhost:8080/api/v1/inscricao"

  constructor(private http: HttpClient){}

  post_inscricao(inscricao: inscricao_model):Observable<any>{
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}`})
    return this.http.post<inscricao_model>(`${this.inscricaoUrl}/evento`, inscricao ,{ "headers": headers })
  }
}
