import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './actions/auth.actions';
import * as ListActions from './actions/list.actions';
import * as LinkActions from './actions/link.actions';


import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ListService } from './services/list.service';
import { Router } from '@angular/router';
import { LinkService } from './services/link.service';

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

@Injectable()
export class ListEffects {

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.getAllLists),
      mergeMap(action =>
        this.listService.getAll()
          .pipe(
            map(
              lists => ListActions.getAllListsSuccess({ lists })
            ),
            catchError(error => of(ListActions.getAllListsFailure({ error })))
          )
      )
    )
  );

  createList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.createList),
      mergeMap(action =>
        this.listService.create(action.list.name)
          .pipe(
            tap(
              list => this.router.navigate(['/dashboard/list/', list.id])
            ),
            map(
              list => ListActions.createListSuccess({ list }),
            ),
            catchError(error => of(ListActions.createListFailure({ error })))
          )
      )
    )
  );

  deleteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.deleteList),
      mergeMap(action =>
        this.listService.delete(action.list)
          .pipe(
            map(
              list => ListActions.deleteListSuccess({ list }),
            ),
            catchError(error => of(ListActions.deleteListFailure({ error })))
          )
      )
    )
  );

  constructor(private actions$: Actions,
              private router: Router,
              private listService: ListService) {
  }
}

@Injectable()
export class LinkEffects {

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinkActions.getAllLinks),
      mergeMap(({ list }) =>
        this.linkService.getAll(list)
          .pipe(
            map(
              links => LinkActions.getAllLinksSuccess({ links })
            ),
            catchError(error => of(LinkActions.getAllLinksFailure({ error })))
          )
      )
    )
  );

  constructor(private actions$: Actions,
              private router: Router,
              private linkService: LinkService) {
  }
}


export default [
  AuthEffects,
  ListEffects,
  LinkEffects
];
