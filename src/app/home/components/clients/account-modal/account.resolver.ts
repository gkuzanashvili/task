import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataService} from '../../../../services/data-service';
import {AccountService} from './account.service';

@Injectable()
export class AccountResolver implements Resolve<any> {

  constructor(private dataService: DataService, private accountService: AccountService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.dataService.sendGetRequest('accountConstants').toPromise()
      .then((constants) => {
        console.log(constants, 'AccountService resolver constants');
      });
  }
}
