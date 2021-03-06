import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import * as AuthActions from './actions/auth.actions';
import * as ListActions from './actions/list.actions';
import * as LinkActions from './actions/link.actions';
import * as ErrorActions from './actions/error.actions';

import { AuthService } from './services/auth.service';
import { ListService } from './services/list.service';
import { LinkService } from './services/link.service';

import { environment } from '../environments/environment';


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
          catchError(error => of(
            AuthActions.loginEmailFailure(),
            ErrorActions.appError({ error })
            ),
          )
        )
      )
    )
  );

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticate),
      mergeMap(action =>
        this.authService.authenticate(action.jwt).pipe(
          map(user => AuthActions.authenticateSuccess({ user })),
          tap(
            () => {
              this.toastr.success('Login successful.');
              this.router.navigate(['/dashboard/']);
            },
          ),
          catchError(error => of(
            AuthActions.authenticateFailure(),
            ErrorActions.appError({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private router: Router,
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
            catchError(error => of(ListActions.getAllListsFailure(), ErrorActions.appError({ error })))
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
            catchError(error => of(ListActions.createListFailure(), ErrorActions.appError({ error })))
          )
      )
    )
  );

  moveList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListActions.moveList),
      mergeMap(action =>
        this.listService.move(action.list, action.new_order)
          .pipe(
            switchMap(
              () => [ListActions.moveListSuccess(action), ListActions.getAllLists()],
            ),
            catchError(error => of(ListActions.moveListFailure(), ErrorActions.appError({ error })))
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
            tap(
              list => this.router.navigate(['/dashboard/'])
            ),
            map(
              () => ListActions.deleteListSuccess({ list: action.list }),
            ),
            catchError(error => of(ListActions.deleteListFailure(), ErrorActions.appError({ error })))
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
      mergeMap(() =>
        this.linkService.getAll()
          .pipe(
            map(
              links => LinkActions.getAllLinksSuccess({ links })
            ),
            catchError(error => of(LinkActions.getAllLinksFailure(), ErrorActions.appError({ error })))
          )
      )
    )
  );

  createLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinkActions.createLink),
      mergeMap(action =>
        this.linkService.create(action.list, action.link.url)
          .pipe(
            map(
              link => LinkActions.createLinkSuccess({ link }),
            ),
            catchError(error => of(LinkActions.createLinkFailure(), ErrorActions.appError({ error })))
          )
      )
    )
  );

  moveLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinkActions.moveLink),
      mergeMap(action =>
        this.linkService.move(action.link, action.new_order)
          .pipe(
            switchMap(
              () => [LinkActions.moveLinkSuccess(action), LinkActions.getAllLinks()],
            ),
            catchError(error => of(LinkActions.moveLinkFailure(), ErrorActions.appError({ error })))
          )
      )
    )
  );

  visitLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinkActions.visitLink),
      mergeMap(action =>
        this.linkService.visit(action.link)
          .pipe(
            switchMap(
              () => [LinkActions.visitLinkSuccess(action), LinkActions.getAllLinks()],
            ),
            catchError(error => of(LinkActions.visitLinkFailure(), ErrorActions.appError({ error })))
          )
      )
    )
  );

  deleteLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinkActions.deleteLink),
      mergeMap(action =>
        this.linkService.delete(action.link)
          .pipe(
            map(
              () => LinkActions.deleteLinkSuccess({ link: action.link }),
            ),
            catchError(error => of(LinkActions.deleteLinkFailure(), ErrorActions.appError({ error })))
          )
      )
    )
  );

  constructor(private actions$: Actions,
              private router: Router,
              private linkService: LinkService) {
  }
}

@Injectable()
export class ErrorEffects {

  error$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ErrorActions.appError),
        tap(
          ({ error }) => {
            if (!environment.production) {
              console.error(error);
            }

            // do error handling here
            let message = 'Unknown Error!';

            if (error && error.message) {
              message = error.message;
            }

            this.toastr.error(message, 'Error!', {
              timeOut: 0
            });
          }
        ),
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions,
              private toastr: ToastrService) {
  }
}


export default [
  AuthEffects,
  ListEffects,
  LinkEffects,
  ErrorEffects
];
