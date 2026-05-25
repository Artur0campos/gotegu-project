import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private eventosUrl = 'http://localhost:8080/api/v1/usuario';
  private headers = new HttpHeaders({ Authorization: 'tokenJWT' })


  constructor(private http:HttpClient){}

  registration_user(obj:User): Observable <User>{
    return this.http.post<User>(`${this.eventosUrl}`, obj)
  }

  authentication(obj:UserLogin): Observable <UserLogin> {
    return this.http.post<UserLogin>(`${this.eventosUrl}/logar`, obj)
  }
  
}
