import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { LinkState } from '../reducers/link.reducer';
import { ILink } from '../models';

export const selectLinks = (state: State) => state.links;

export const selectLinksAll = createSelector(
  selectLinks,
  (state: LinkState) => Array.from(Object.values(state.links))
);

export const selectLinksForList = createSelector(
  selectLinksAll,
  (links: ILink[], { listId }) => links.filter(candidate => candidate.list_id === listId)
    .sort((a, b) => a.order - b.order)
);

export const selectLinksRetrieveLoading = createSelector(
  selectLinks,
  (state: LinkState) => state.loading.retrieve
);

export const selectLinksCreateLoading = createSelector(
  selectLinks,
  (state: LinkState) => state.loading.create
);

export const selectLinksDeleteLoading = createSelector(
  selectLinks,
  (state: LinkState) => state.loading.delete
);

export const selectLinksMoveLoading = createSelector(
  selectLinks,
  (state: LinkState) => state.loading.move
);

export const selectLinksTransferLoading = createSelector(
  selectLinks,
  (state: LinkState) => state.loading.transfer
);

export const selectLinksLoading = createSelector(
  [selectLinksRetrieveLoading, selectLinksCreateLoading, selectLinksDeleteLoading, selectLinksMoveLoading, selectLinksTransferLoading],
  (...args) => args.some(t => t)
);

export const selectLinkById = createSelector(
  selectLinks,
  (state: LinkState, { id }: { id: string }) => state.links[id]
);
