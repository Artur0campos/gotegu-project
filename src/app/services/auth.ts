import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../models/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private loginUrl = 'http://localhost:8080/api/v1/usuario/logar';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private route: Router) { }

  login(obj: UserLogin): Observable<any> {
    return this.http.post<UserLogin>(`${this.loginUrl}`, obj, { "headers": this.headers }).pipe(
      map(data => {
        return data
      })
    )
  }

  setToken(token: string) {
    sessionStorage.setItem("token_jwt", token)
  }


  getToken(): string {
    return sessionStorage.getItem("token_jwt") ?? ''
  }


  logout() {
    sessionStorage.removeItem("token_jwt");
    this.route.navigate(['/login'])
  }


isLoggedIn(): boolean {
  const token = sessionStorage.getItem("token_jwt")
  console.log(token)

  if (token == null) {
    console.log("nulo")
    sessionStorage.setItem("token_jwt", "n")
    return false;
  }
  if(token.length < 10){
    console.log("caiu no menor que")
    return false
  }
  console.log("ta tudo certo e caiu em true no loggedIn")
  return true;

}
  
}
