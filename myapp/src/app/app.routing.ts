import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SListDetailsComponent } from './components/home/slistdetails.component';

const routes: Routes = [
   { path: 'slist/login', component: LoginComponent }, { path: '', redirectTo: '/slist/login', pathMatch: 'full'},
   { path: 'slist/logout', component: LoginComponent },
   //,{path:'slist/',redirectTo:'/slist/login',pathMatch:'full'},
   { path: 'slist/contact', component: ContactComponent },
   { path: 'slist/home', component: HomeComponent,
      children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: SListDetailsComponent }
    ] },
  { path: 'slist/about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
