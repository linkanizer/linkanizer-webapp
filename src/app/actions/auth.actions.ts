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
);

export const logout = createAction(
  '[Auth] Logout'
);

export const authenticate = createAction(
  '[Auth] Authenticate',
  props<{ jwt: string }>()
);

export const authenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{ user: IUser }>()
);

export const authenticateFailure = createAction(
  '[Auth] Authenticate Failure'
);

export const updateAuthToken = createAction(
  '[Auth] Update Auth Token',
  props<{ jwt: string }>()
);
