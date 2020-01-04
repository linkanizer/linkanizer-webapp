import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { selectAuthLoading, selectAuthUser, selectAuthUserIsLoggedIn } from '../selectors';
import * as AuthActions from '../actions/auth.actions';
import { IUser } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn$: Observable<boolean> = this.store.select(selectAuthUserIsLoggedIn);
  public user$: Observable<IUser> = this.store.select(selectAuthUser);
  public authLoading$: Observable<boolean> = this.store.select(selectAuthLoading);

  public emailControl: FormControl = new FormControl('', [Validators.email, Validators.required]);

  constructor(private store: Store<State>) {
  }

  ngOnInit() {

  }

  request_login_email() {
    this.store.dispatch(AuthActions.loginEmailRequest({ credentials: { email: this.emailControl.value } }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
