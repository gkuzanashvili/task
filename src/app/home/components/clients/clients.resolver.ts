import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ClientsService} from './clients.service';

@Injectable({providedIn: 'root'})
export class ClientsResolver implements Resolve<any>{
  constructor(private clientService: ClientsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log(this.clientService.getClients(), 'resolver');
    return this.clientService.getClients();
  }
}
