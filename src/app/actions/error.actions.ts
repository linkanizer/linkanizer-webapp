import { createAction, props } from '@ngrx/store';

export const appError = createAction(
  '[App] Error',
  props<{ error: Error }>()
);

