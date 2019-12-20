import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { selectAuthUserIsLoggedIn } from './selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectAuthUserIsLoggedIn)
      .pipe(
        tap(
          isLoggedIn => {
            if (!isLoggedIn) {
              this.router.navigate(['/']);
            }
          }
        )
      );
  }
}
