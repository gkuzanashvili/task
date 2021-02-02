import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class ClientsGuard implements CanActivate {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (state.url === '/home') {
      this.router.navigate([], {
        queryParams: {
          page: 1
        },
        relativeTo: this.activatedRoute
      }).then();
    }
    return true;
  }
}
