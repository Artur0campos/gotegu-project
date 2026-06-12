import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { EditBase } from './pages/edit-base/edit-base';
import { LoginPage } from './pages/login-page/login-page';
import { CadastroPage } from './pages/cadastro-page/cadastro-page';
import { authGuard } from './guard/auth-guard';
import { EventResgistration } from './pages/event-resgistration/event-resgistration';
import { ListUsers } from './pages/list-users/list-users';
import { CreatingUser } from './pages/creating-user/creating-user';

export const routes: Routes = [

{
    path:'homePage',
    component: HomePage,
    
},

{
    path:'',
    component: LoginPage
},

{
    path:'eventRegistration/:id',
    component: EventResgistration,
    
},

{
    
    path: 'edit',
    component: EditBase,
    

},

{
path: 'login',
    component: LoginPage
},

{
    path: 'registerUser',
    component: CadastroPage
},
{
    path: 'listOfUsers',
    component: ListUsers
},

{
    path: 'newUser',
    component: CreatingUser
}
];
