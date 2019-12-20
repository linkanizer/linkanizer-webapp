import { createAction, props } from '@ngrx/store';
import { ICredentials, IUser } from '../models';

export const loginEmailRequest = createAction(
  '[Auth] Login Email Request',
  props<{ credentials: ICredentials }>()
);

export const loginEmailSuccess = createAction(
  '[Auth] Login Email Request Success',
);

export const loginEmailFailure = createAction(
  '[Auth] Login Email Request Failure',
  props<{ error: Error }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ user: IUser }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
