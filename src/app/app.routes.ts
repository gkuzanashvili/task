import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ClientsResolver} from './home/components/clients/clients.resolver';
import {ClientsGuard} from './home/components/clients/clients.guard';

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    canActivate: [ClientsGuard],
    component: HomeComponent,
    resolve: {clients: ClientsResolver}
  }
];
