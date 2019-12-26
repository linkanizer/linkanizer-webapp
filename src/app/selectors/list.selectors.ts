import { createSelector } from '@ngrx/store';
import { State } from '../reducers';
import { ListState } from '../reducers/list.reducer';

export const selectLists = (state: State) => state.lists;

export const selectListsAll = createSelector(
  selectLists,
  (state: ListState) => Array.from(Object.values(state.lists))
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

export const selectListById = createSelector(
  selectLists,
  (state: ListState, { id }: { id: string }) => state.lists[id]
);
