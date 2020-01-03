import { Action, createReducer, on } from '@ngrx/store';

import * as LinkActions from '../actions/link.actions';
import { ILink } from '../models';

export interface LinkState {
  links: { [key: string]: ILink };
  linkIds: string[];
  loading: {
    retrieve: boolean;
    create: boolean;
    delete: boolean;
    move: boolean;
  };
  error: Error;
}

const emptyLoadingState = {
  retrieve: false,
  create: false,
  delete: false,
  move: false
};

const initialState: LinkState = {
  linkIds: [],
  links: {},
  loading: emptyLoadingState,
  error: null
};

const listReducer = createReducer(
  initialState,
  on(LinkActions.getAllLinks, (state, { list }) => {
    return {
      linkIds: [],
      links: {},
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
    linkIds: links.map(link => link.id),
    links: links.reduce((acc, next) => Object.assign(acc, { [next.id]: next }), {}),
    loading: emptyLoadingState,
    error: null
  })),
  on(LinkActions.createLink, state => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      create: true
    }
  })),
  on(LinkActions.createLinkSuccess, (state, { link }) => ({
    linkIds: [...state.linkIds, link.id],
    links: { ...state.links, [link.id]: link },
    loading: emptyLoadingState,
    error: null
  })),
  on(LinkActions.createLinkFailure, (state, { error }) => ({
    ...state,
    loading: emptyLoadingState,
    error
  })),
  on(LinkActions.moveLink, state => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      move: true
    }
  })),
  on(LinkActions.moveLinkSuccess, (state, { link, new_order }) => {
    const newState: LinkState = {
      linkIds: [...state.linkIds],
      links: { ...state.links },
      loading: emptyLoadingState,
      error: null
    };

    // thanks to https://www.revsys.com/tidbits/keeping-django-model-objects-ordered/

    const current_order = link.order;

    for (const linkId of state.linkIds.filter(candidate => candidate !== link.id)) {
      const obj = newState.links[linkId];

      if (new_order < current_order) {
        if (obj.order < current_order && obj.order >= new_order) {
          newState.links[linkId] = {
            ...obj,
            order: obj.order + 1
          };
        }
      } else {
        if (obj.order <= new_order && obj.order > current_order) {
          newState.links[linkId] = {
            ...obj,
            order: obj.order - 1
          };
        }
      }
    }

    newState.links[link.id] = {
      ...link,
      order: new_order
    };

    return newState;
  }),
  on(LinkActions.moveLinkFailure, (state, { error }) => ({
    ...state,
    loading: emptyLoadingState,
    error
  })),
  on(LinkActions.deleteLink, (state, props) => ({
    ...state,
    loading: {
      ...emptyLoadingState,
      delete: true
    }
  })),
  on(LinkActions.deleteLinkSuccess, (state, { link }) => ({
    linkIds: state.linkIds.filter(candidate => candidate !== link.id),
    links: state.linkIds
      .filter(candidate => candidate !== link.id)
      .reduce((acc, next) => ({
          ...acc,
          [next]: state.links[next]
        }),
        {}
      ),
    loading: emptyLoadingState,
    error: null
  })),
  on(LinkActions.deleteLinkFailure, (state, { error }) => ({
    ...state,
    loading: emptyLoadingState,
    error
  })),
);

export function reducer(state: LinkState | undefined, action: Action): LinkState {
  return listReducer(state, action);
}
