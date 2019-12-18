import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IUser } from '../models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  private subscription: Subscription;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.subscription = this.currentUser.subscribe(
      next => localStorage.setItem('currentUser', JSON.stringify(next))
    );
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public request_login_email(email: string): Observable<void> {
    return this.http.post(`${environment.api}/auth/request-login-email`, { email })
      .pipe(
        tap(
          () => {
            this.toastr.success('Login email sent.');
          }
        ),
        map(
          () => {
          }
        )
      );
  }

  public login(jwt: string): void {
    this.currentUserSubject.next({ jwt });

    this.toastr.success('Login successful.');
  }

  public logout(): void {
    this.currentUserSubject.next(null);
    this.toastr.info('You have been logged out.');
  }
}
