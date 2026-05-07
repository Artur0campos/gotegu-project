import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { EventRegistration } from './pages/event-registration/event-registration';

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
}
];
