import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { ListState } from '../reducers/list.reducer';

export const selectLists = (state: State) => state.lists;

export const selectListsAll = createSelector(
  selectLists,
  (state: ListState) => Array.from(Object.values(state.lists))
    .sort((a, b) => a.order - b.order)
);

export const selectListsRetrieveLoading = createSelector(
  selectLists,
  (state: ListState) => state.loading.retrieve
);

export const selectListsCreateLoading = createSelector(
  selectLists,
  (state: ListState) => state.loading.create
);

export const selectListsDeleteLoading = createSelector(
  selectLists,
  (state: ListState) => state.loading.delete
);

export const selectListsMoveLoading = createSelector(
  selectLists,
  (state: ListState) => state.loading.move
);

export const selectListsLoading = createSelector(
  [selectListsCreateLoading, selectListsDeleteLoading, selectListsRetrieveLoading, selectListsMoveLoading],
  (...args) => args.some(t => t)
);

export const selectListById = createSelector(
  selectLists,
  (state: ListState, { id }: { id: string }) => state.lists[id]
);
