import {DataService} from '../../../services/data-service';
import {Injectable} from '@angular/core';
import {ClientModel} from './clients.model';

@Injectable({providedIn: 'root'})
export class ClientsService extends DataService{

  getClients(): Promise<ClientModel[]>{
    return this.sendGetRequest('clients');
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
