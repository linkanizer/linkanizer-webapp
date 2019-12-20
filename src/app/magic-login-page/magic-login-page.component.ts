import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

import * as AuthActions from '../actions/auth.actions';

@Component({
  selector: 'app-magic-login-page',
  templateUrl: './magic-login-page.component.html',
  styleUrls: ['./magic-login-page.component.css']
})
export class MagicLoginPageComponent implements OnInit {

  constructor(private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const jwt = this.route.snapshot.params.token;

    // TODO check if token is valid
    this.store.dispatch(AuthActions.login({ user: { jwt } }));

    this.router.navigate(['/dashboard/']);
  }

}

