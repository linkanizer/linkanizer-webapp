import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { IAuthentication, IUser } from '../models';

export interface AuthState {
  user: IUser;
  authentication: IAuthentication;
  loading: boolean;
  error: Error;
}

const initialState: AuthState = {
  user: null,
  authentication: null,
  loading: false,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticate, (state, { jwt }) => ({
    user: null,
    loading: true,
    error: null,
    authentication: { jwt }
  })),
  on(AuthActions.authenticateSuccess, (state, { user }) => ({
    user,
    authentication: state.authentication,
    loading: false,
    error: null
  })),
  on(AuthActions.logout, state => ({
    user: null,
    authentication: null,
    loading: false,
    error: null
  })),
  on(AuthActions.loginEmailRequest, state => ({
    user: null,
    authentication: null,
    loading: true,
    error: null
  })),
  on(AuthActions.loginEmailSuccess, state => ({
    loading: false,
    authentication: null,
    error: null,
    user: null
  })),
  on(AuthActions.loginEmailFailure, (state, { error }) => ({
    loading: false,
    authentication: null,
    error,
    user: null
  }))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
