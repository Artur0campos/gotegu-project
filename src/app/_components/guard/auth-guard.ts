import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth';


export const authGuard: CanActivateFn = () => {

  const router = inject(Router)
  const auth = inject(Auth)

  console.log('Guard executado')
  console.log('isLoggedIn:', auth.isLoggedIn());


  if (auth.isLoggedIn()) {
    return true;
  }
  else{
  router.navigateByUrl('/login')
  return false}
}
