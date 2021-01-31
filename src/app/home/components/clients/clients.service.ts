import {DataService} from '../../../services/data-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ClientModel} from './clients.model';

@Injectable()
export class ClientsService extends DataService{

  getClients(): Observable<ClientModel[]>{
    return this.sendGetRequest('clients');
  }

  getClient(id): Promise<any>{
    return this.sendGetRequestById('clients', id);
  }

  deleteClient(id): Promise<any> {
    return this.sendDeleteRequest('clients', id);
  }
  updateClient(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }
  saveClient(client): Promise<any> {
    return this.sendPostRequest('clients', client);
  }

}
