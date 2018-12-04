import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';

@Injectable()

// имплементируемся
//  canActivate и canActivateChild - методы, которые говорят ангуляру можно ли загружать определенный модуль или роут
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLogged()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            });
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
}