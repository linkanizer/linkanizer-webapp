import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICredentials } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  public request_login_email({ email }: ICredentials): Observable<boolean> {
    return this.http.post(`${environment.api}/auth/request-login-email`, { email })
      .pipe(
        // tap(
        //   () => {
        //     this.toastr.success('Login email sent.');
        //   }
        // ),
        map(
          () => true
        )
      );
  }

  // public login(credentials: ICredentials): void {
  //
  //   this.toastr.success('Login successful.');
  // }
  //
  // public logout(): void {
  //   this.currentUserSubject.next(null);
  //   this.toastr.info('You have been logged out.');
  // }
}
