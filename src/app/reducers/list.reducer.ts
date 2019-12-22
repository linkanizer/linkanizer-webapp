import { Action, createReducer, on } from '@ngrx/store';

import * as ListActions from '../actions/list.actions';
import { IList } from '../models';

export interface ListState {
  lists: Map<string, IList>;
  listIds: string[];
  loading: {
    retrieve: boolean;
    create: boolean;
    delete: boolean;
  };
  error: Error;
}

const emptyLoadingState = {
  retrieve: false,
  create: false,
  delete: false
};

const initialState: ListState = {
  listIds: [],
  lists: new Map(),
  loading: emptyLoadingState,
  error: null
};

const listReducer = createReducer(
  initialState,
  on(ListActions.getAllLists, state => ({
    listIds: [],
    lists: new Map(),
    loading: {
      ...emptyLoadingState,
      retrieve: true
    },
    error: null
  })),
  on(ListActions.getAllListsFailure, (state, { error }) => ({
    listIds: [],
    lists: new Map(),
    loading: emptyLoadingState,
    error
  })),
  on(ListActions.getAllListsSuccess, (state, { lists }) => ({
    listIds: lists.map(list => list.id),
    lists: new Map(lists.map(list => [list.id, list])),
    loading: emptyLoadingState,
    error: null
  }))
);

export function reducer(state: ListState | undefined, action: Action): ListState {
  return listReducer(state, action);
}
