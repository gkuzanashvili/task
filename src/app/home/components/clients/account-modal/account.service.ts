import {Injectable} from '@angular/core';
import {DataService} from '../../../../services/data-service';
import {AccountStatusType, AccountTypeModel, CurrencyModel} from './account.model';


@Injectable()
export class AccountService extends DataService {

  public statuses: AccountStatusType[];

  public types: AccountTypeModel[];

  public currencies: CurrencyModel[];

  deleteAccount(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }

  updateAccount(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }

  saveAccount(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }

  getConstants(): Promise<any> {
    return this.sendGetRequest('accountConstants');
  }

}
