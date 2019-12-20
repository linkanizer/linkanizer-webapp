import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './actions/auth.actions';

import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {

  requestLoginEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginEmailRequest),
      mergeMap(action =>
        this.authService.request_login_email(action.credentials).pipe(
          map(user => AuthActions.loginEmailSuccess()),
          tap(
            () => {
              this.toastr.success('Login email sent.');
            }
          ),
          catchError(error => of(AuthActions.loginEmailFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private toastr: ToastrService) {
  }
}

export default [
  AuthEffects
];
