import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { selectAuthLoading, selectAuthUserIsLoggedIn } from '../selectors';
import * as AuthActions from '../actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn$: Observable<boolean> = this.store.select(selectAuthUserIsLoggedIn);
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
