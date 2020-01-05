import { createSelector } from '@ngrx/store';
import { selectAuthLoading } from './auth.selectors';
import { selectLinksLoading } from './link.selectors';
import { selectListsLoading } from './list.selectors';

export const selectAppLoading = createSelector(
  [selectAuthLoading, selectLinksLoading, selectListsLoading],
  (...args) => args.some(val => val)
);

