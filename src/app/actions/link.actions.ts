import { createAction, props } from '@ngrx/store';
import { ILink, IList } from '../models';

export const getAllLinks = createAction(
  '[Links] Get All Links',
);

export const getAllLinksSuccess = createAction(
  '[Links] Get All Links Success',
  props<{ links: ILink[] }>()
);

export const getAllLinksFailure = createAction(
  '[Links] Get All Links Failure',
);

export const createLink = createAction(
  '[Links] Create Link',
  props<{ link: Partial<ILink>, list: IList }>()
);

export const createLinkSuccess = createAction(
  '[Links] Create Link Success',
  props<{ link: ILink }>()
);

export const createLinkFailure = createAction(
  '[Links] Create Link Failure',
);

export const deleteLink = createAction(
  '[Links] Delete Link',
  props<{ link: ILink }>()
);

export const deleteLinkSuccess = createAction(
  '[Links] Delete Link Success',
  props<{ link: ILink }>()
);

export const deleteLinkFailure = createAction(
  '[Links] Delete Link Failure',
);

export const moveLink = createAction(
  '[Links] Move Link',
  props<{ link: ILink, new_order: number }>()
);

export const moveLinkSuccess = createAction(
  '[Links] Move Link Success',
  props<{ link: ILink, new_order: number }>()
);

export const moveLinkFailure = createAction(
  '[Links] Move Link Failure',
);
