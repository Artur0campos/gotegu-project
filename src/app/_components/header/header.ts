import { Component } from '@angular/core';
import { AvatarBtn } from "../avatar-btn/avatar-btn";
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [AvatarBtn],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private router: Router) { }

  nav() {
    this.router.navigateByUrl('/edit');
  }

  home() {
    this.router.navigateByUrl('/homePage')
  }

  listOfUsers() {
    this.router.navigateByUrl('/listOfUsers')
  }

  logout() {
    sessionStorage.removeItem('token_jwt')
    this.router.navigateByUrl('/login')
  }
}
