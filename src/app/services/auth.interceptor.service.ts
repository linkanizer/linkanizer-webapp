import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { selectAuthAuthentication } from '../selectors';
import { switchMap, take, tap } from 'rxjs/operators';
import * as decode from 'jwt-decode';

import * as AuthActions from '../actions/auth.actions';


/*
 * thanks to
 * https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
 */

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<State>,
              private http: HttpClient) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const whitelist = ['/auth/request-login-email', '/api/token/refresh'];

    if (request.url.includes(environment.api) && whitelist.every(white => !request.url.includes(white))) {
      return this.store.select(selectAuthAuthentication)
        .pipe(
          take(1),
          switchMap(
            auth => {
              // Check if JWT is expired, and if so, grab new token
              const decoded = decode(auth.jwt);
              const currentTime = new Date().getTime() / 1000;

              if (currentTime > decoded.exp) {
                // expired token
                return this.http.post<any>(
                  `${environment.api}/api/token/refresh`,
                  { token: auth.jwt }
                )
                  .pipe(
                    tap(
                      ({ token }) => {
                        this.store.dispatch(AuthActions.updateAuthToken({ jwt: token }));
                      }
                    ),
                    switchMap(
                      ({ token }) => {
                        request = request.clone({
                          setHeaders: {
                            Authorization: `Bearer ${token}`
                          }
                        });

                        return next.handle(request);
                      }
                    )
                  );
              }

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

    return next.handle(request);
  }
}
