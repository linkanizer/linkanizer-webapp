import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as AuthReducer from './auth.reducer';
import * as ListReducer from './list.reducer';
import * as LinkReducer from './link.reducer';

export interface State {
  auth: AuthReducer.AuthState;
  lists: ListReducer.ListState;
  links: LinkReducer.LinkState;
}

export const reducers: ActionReducerMap<State> = {
  auth: AuthReducer.reducer,
  lists: ListReducer.reducer,
  links: LinkReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
