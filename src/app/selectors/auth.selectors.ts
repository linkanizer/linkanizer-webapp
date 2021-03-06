import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { State } from '../reducers';

export const selectAuth = (state: State) => state.auth;

export const selectAuthLoading = createSelector(
  selectAuth,
  (state: AuthState) => !!state && state.loading
);

export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectAuthAuthentication = createSelector(
  selectAuth,
  (state: AuthState) => state.authentication
);

export const selectAuthUserIsLoggedIn = createSelector(
  selectAuth,
  (state: AuthState) => !!state.user
);
