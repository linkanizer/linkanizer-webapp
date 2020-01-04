import { createAction, props } from '@ngrx/store';
import { ILink, IList } from '../models';

export const getAllLists = createAction(
  '[Lists] Get All Lists'
);

export const getAllListsSuccess = createAction(
  '[Lists] Get All Lists Success',
  props<{ lists: IList[] }>()
);

export const getAllListsFailure = createAction(
  '[Lists] Get All Lists Failure',
  props<{ error: Error }>()
);

export const createList = createAction(
  '[Lists] Create List',
  props<{ list: Partial<IList> }>()
);

export const createListSuccess = createAction(
  '[Lists] Create List Success',
  props<{ list: IList }>()
);

export const createListFailure = createAction(
  '[Lists] Create List Failure',
  props<{ error: Error }>()
);

export const deleteList = createAction(
  '[Lists] Delete List',
  props<{ list: IList }>()
);

export const deleteListSuccess = createAction(
  '[Lists] Delete List Success',
  props<{ list: IList }>()
);

export const deleteListFailure = createAction(
  '[Lists] Delete List Failure',
  props<{ error: Error }>()
);

export const moveList = createAction(
  '[Lists] Move List',
  props<{ list: IList, new_order: number }>()
);

export const moveListSuccess = createAction(
  '[Lists] Move List Success',
  props<{ list: IList, new_order: number }>()
);

export const moveListFailure = createAction(
  '[Lists] Move List Failure',
  props<{ error: Error }>()
);
