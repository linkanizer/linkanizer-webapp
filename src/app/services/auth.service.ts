import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IUser } from '../models';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

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

  public request_login_email(email: string): Observable<void> {
    return this.http.post(`${environment.api}/auth/login`, { email })
      .pipe(
        map(
          () => {
          }
        )
      );
  }

  public login(jwt: string): void {
    this.currentUserSubject.next({ jwt });

    this.toastr.success('Login successful');
  }
}
