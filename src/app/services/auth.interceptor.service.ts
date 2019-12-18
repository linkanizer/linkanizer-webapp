import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

/*
 * thanks to
 * https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
 */

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.currentUserValue;

    const whitelist = ['/auth/request-login-email'];

    if (request.url.includes(environment.api)) {
      if (whitelist.every(white => !request.url.includes(white))) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.jwt}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
