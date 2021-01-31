import {Injectable} from '@angular/core';
import {DataService} from '../../../../services/data-service';
import {AccountStatusType, AccountTypeModel, CurrencyModel} from './account.model';



@Injectable()
export class AccountService extends DataService{


  public statuses: AccountStatusType[] =  [{label: 'აქტიური', value: 'A'}, {label: 'დახურული', value: 'C'}];

  public types: AccountTypeModel[] = [{label: 'მიმდინარე', value: 1}, {label: 'შემნახველი', value: 2}, {label: 'დაგროვებითი', value: 3}];

  public currencies: CurrencyModel[] = [{label: 'GEL', value: 'GEL'}, {label: 'USD', value: 'USD'},
    {label: 'EUR', value: 'EUR'}, {label: 'RUB', value: 'RUB'}];


  deleteAccount(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }
  updateAccount(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }
  saveAccount(client): Promise<any> {
    return this.sendPutRequest('clients', client);
  }
}
