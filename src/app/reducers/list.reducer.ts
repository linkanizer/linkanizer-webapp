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
    move: boolean;
  };
}

const emptyLoadingState = {
  retrieve: false,
  create: false,
  delete: false,
  move: false,
};

const initialState: ListState = {
  listIds: [],
  lists: {},
  loading: emptyLoadingState,
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
  })),
  on(ListActions.getAllListsFailure, (state) => ({
    listIds: [],
    lists: {},
    loading: emptyLoadingState,
  })),
  on(ListActions.getAllListsSuccess, (state, { lists }) => ({
    listIds: lists.map(list => list.id),
    lists: lists.reduce((acc, next) => Object.assign(acc, { [next.id]: next }), {}),
    loading: emptyLoadingState,
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
  })),
  on(ListActions.createListFailure, (state) => ({
    ...state,
    loading: emptyLoadingState,
  })),
  on(ListActions.moveList, state => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      move: true
    }
  })),
  on(ListActions.moveListSuccess, (state) => ({
    ...state,
    loading: emptyLoadingState
  })),
  on(ListActions.moveListFailure, (state) => ({
    ...state,
    loading: emptyLoadingState,
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
    lists: state.listIds
      .filter(candidate => candidate !== list.id)
      .reduce((acc, next) => ({
          ...acc,
          [next]: state.lists[next]
        }),
        {}
      ),
    loading: emptyLoadingState,
  })),
  on(ListActions.deleteListFailure, (state) => ({
    ...state,
    loading: emptyLoadingState,
  })),
);

export function reducer(state: ListState | undefined, action: Action): ListState {
  return listReducer(state, action);
}
