import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { LinkState } from '../reducers/link.reducer';

export const selectLinks = (state: State) => state.links;

export const selectLinksAll = createSelector(
  selectLinks,
  (state: LinkState) => Array.from(Object.values(state.links))
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

export const selectLinkById = createSelector(
  selectLinks,
  (state: LinkState, { id }: { id: string }) => state.links[id]
);
