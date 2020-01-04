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
  on(ListActions.moveList, state => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      move: true
    }
  })),
  on(ListActions.moveListSuccess, (state, { list, new_order }) => {
    const newState: ListState = {
      listIds: [...state.listIds],
      lists: { ...state.lists },
      loading: emptyLoadingState,
      error: null
    };

    // thanks to https://www.revsys.com/tidbits/keeping-django-model-objects-ordered/

    const current_order = list.order;

    for (const listId of state.listIds.filter(candidate => candidate !== list.id)) {
      const obj = newState.lists[listId];

      if (new_order < current_order) {
        if (obj.order < current_order && obj.order >= new_order) {
          newState.lists[listId] = {
            ...obj,
            order: obj.order + 1
          };
        }
      } else {
        if (obj.order <= new_order && obj.order > current_order) {
          newState.lists[listId] = {
            ...obj,
            order: obj.order - 1
          };
        }
      }
    }

    newState.lists[list.id] = {
      ...list,
      order: new_order
    };

    return newState;
  }),
  on(ListActions.moveListFailure, (state, { error }) => ({
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
    lists: state.listIds
      .filter(candidate => candidate !== list.id)
      .reduce((acc, next) => ({
          ...acc,
          [next]: state.lists[next]
        }),
        {}
      ),
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
