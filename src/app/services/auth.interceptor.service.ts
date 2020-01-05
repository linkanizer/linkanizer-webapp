import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { selectAuthAuthentication } from '../selectors';
import { switchMap, take } from 'rxjs/operators';

/*
 * thanks to
 * https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
 */

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<State>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const whitelist = ['/auth/request-login-email'];

    if (request.url.includes(environment.api)) {
      if (whitelist.every(white => !request.url.includes(white))) {
        return this.store.select(selectAuthAuthentication)
          .pipe(
            take(1),
            switchMap(
              auth => {

                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${auth.jwt}`
                  }
                });

                return next.handle(request);
              }
            )
          );
      }
    }

    return next.handle(request);
  }
}
