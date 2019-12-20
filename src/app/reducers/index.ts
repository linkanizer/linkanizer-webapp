import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as AuthReducer from './auth.reducer';

export interface State {
  auth: AuthReducer.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: AuthReducer.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
