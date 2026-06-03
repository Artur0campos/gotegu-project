import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private usarioUrl = 'http://localhost:8080/api/v1/usuario';


  constructor(private http:HttpClient){}

  registration_user(obj:User): Observable <User>{
    return this.http.post<User>(`${this.usarioUrl}`, obj)
  }

  authentication(obj:UserLogin): Observable <any> {
    return this.http.post<UserLogin>(`${this.usarioUrl}/logar`, obj)
  }
  
  list_users(): Observable<any>{
    const token = sessionStorage.getItem('token_jwt')
    const headers = new HttpHeaders({ Authorization: `${token}`})
    return this.http.get<any>(`${this.usarioUrl}`, { "headers": headers } )
  }
}
