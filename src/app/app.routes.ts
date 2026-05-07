import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { EventRegistration } from './pages/event-registration/event-registration';
import { EditBase } from './pages/edit-base/edit-base';

export const routes: Routes = [

{
    path:'homePage',
    component: HomePage
},

{
    path:'',
    component: HomePage
},

{
    path:'registration',
    component: EventRegistration
},

{
    
    path: 'edit',
    component: EditBase

}
];
