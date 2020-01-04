import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials, IUser } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

interface IAuthenticateResponse {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  public request_login_email({ email }: ICredentials): Observable<boolean> {
    return this.http.post(`${environment.api}/auth/request-login-email`, { email })
      .pipe(
        map(
          () => true
        )
      );
  }

  public authenticate(jwt: string): Observable<IUser> {
    return this.http.get<IAuthenticateResponse>(`${environment.api}/auth/users/current`)
      .pipe(
        map(
          ({ email }) => ({
            email,
            jwt
          })
        )
      );
  }
}
