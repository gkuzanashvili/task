import {DataService} from '../../../services/data-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ClientModel} from './clients.model';

@Injectable()
export class ClientsService extends DataService{

  getClients(): Observable<ClientModel[]>{
    return this.sendGetRequest('clients');
  }

  deleteClient(id) {
    return this.sendDeleteRequest('clients', id);
  }
}
