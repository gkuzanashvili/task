import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ClientsComponent} from './home/components/clients/clients.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClientsComponent },
];
