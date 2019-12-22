import { Action, createReducer, on } from '@ngrx/store';

import * as LinkActions from '../actions/link.actions';
import { ILink } from '../models';

export interface LinkState {
  links: Map<string, ILink>;
  linkIds: string[];
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

const initialState: LinkState = {
  linkIds: [],
  links: new Map(),
  loading: emptyLoadingState,
  error: null
};

const listReducer = createReducer(
  initialState,
  on(LinkActions.getAllLinks, (state, { list }) => {
    // Remove all links for given list from store, in case they have been deleted
    const links = Array.from(state.links.values()).filter(link => link.listId !== list.id);
    const linkIds = links.map(link => link.id);

    return {
      linkIds,
      links: new Map(links.map(link => [link.id, link])),
      loading: {
        ...emptyLoadingState,
        retrieve: true
      },
      error: null
    };
  }),
  on(LinkActions.getAllLinksFailure, (state, { error }) => ({
    ...state,
    loading: emptyLoadingState,
    error
  })),
  on(LinkActions.getAllLinksSuccess, (state, { links }) => ({
    linkIds: [...state.linkIds, ...links.map(link => link.id)],
    links: new Map([...Array.from(state.links.entries()) as any, ...links.map(link => [link.id, link])]),
    loading: emptyLoadingState,
    error: null
  }))
);

export function reducer(state: LinkState | undefined, action: Action): LinkState {
  return listReducer(state, action);
}
