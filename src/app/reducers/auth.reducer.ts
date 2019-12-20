import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import { IUser } from '../models';

export interface AuthState {
  user: IUser;
  loading: boolean;
  error: Error;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => ({
    user,
    loading: false,
    error: null
  })),
  on(AuthActions.logout, state => ({
    user: null,
    loading: false,
    error: null
  })),
  on(AuthActions.loginEmailRequest, state => ({
    user: null,
    loading: true,
    error: null
  })),
  on(AuthActions.loginEmailSuccess, state => ({
    loading: false,
    error: null,
    user: null
  })),
  on(AuthActions.loginEmailFailure, (state, { error }) => ({
    loading: false,
    error,
    user: null
  }))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
