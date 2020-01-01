import { Action, createReducer, on } from '@ngrx/store';

import * as ListActions from '../actions/list.actions';
import { IList } from '../models';

export interface ListState {
  lists: { [key: string]: IList };
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
  lists: {},
  loading: emptyLoadingState,
  error: null
};

const listReducer = createReducer(
  initialState,
  on(ListActions.getAllLists, state => ({
    listIds: [],
    lists: {},
    loading: {
      ...emptyLoadingState,
      retrieve: true
    },
    error: null
  })),
  on(ListActions.getAllListsFailure, (state, { error }) => ({
    listIds: [],
    lists: {},
    loading: emptyLoadingState,
    error
  })),
  on(ListActions.getAllListsSuccess, (state, { lists }) => ({
    listIds: lists.map(list => list.id),
    lists: lists.reduce((acc, next) => Object.assign(acc, { [next.id]: next }), {}),
    loading: emptyLoadingState,
    error: null
  })),
  on(ListActions.createList, (state, props) => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      create: true
    }
  })),
  on(ListActions.createListSuccess, (state, { list }) => ({
    listIds: [...state.listIds, list.id],
    lists: { ...state.lists, [list.id]: list },
    loading: emptyLoadingState,
    error: null
  })),
  on(ListActions.createListFailure, (state, { error }) => ({
    ...state,
    loading: emptyLoadingState,
    error
  })),
  on(ListActions.deleteList, (state, props) => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      delete: true
    }
  })),
  on(ListActions.deleteListSuccess, (state, { list }) => ({
    listIds: state.listIds.filter(candidate => candidate !== list.id),
    lists: Object.keys(state.lists).reduce( (acc, next) => {
      Object.assign(acc, {[list.id]})
    }),
    loading: emptyLoadingState,
    error: null
  })),
  on(ListActions.deleteListFailure, (state, { error }) => ({
    ...state,
    loading: emptyLoadingState,
    error
  })),
);

export function reducer(state: ListState | undefined, action: Action): ListState {
  return listReducer(state, action);
}
