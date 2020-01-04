import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { IAuthentication, IUser } from '../models';

export interface AuthState {
  user: IUser;
  authentication: IAuthentication;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authentication: null,
  loading: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticate, (state, { jwt }) => ({
    user: null,
    loading: true,
    authentication: { jwt }
  })),
  on(AuthActions.authenticateSuccess, (state, { user }) => ({
    user,
    authentication: state.authentication,
    loading: false,
  })),
  on(AuthActions.authenticateFailure, state => ({
    ...state,
    loading: false
  })),
  on(AuthActions.logout, state => ({
    user: null,
    authentication: null,
    loading: false,
  })),
  on(AuthActions.loginEmailRequest, state => ({
    user: null,
    authentication: null,
    loading: true,
  })),
  on(AuthActions.loginEmailSuccess, state => ({
    loading: false,
    authentication: null,
    user: null
  })),
  on(AuthActions.loginEmailFailure, state => ({
    loading: false,
    authentication: null,
    user: null
  }))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
