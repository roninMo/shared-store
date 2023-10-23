import { createAction, props } from '@ngrx/store';

/**
 * Interface for the 'Comments' data
 */
export interface CommentsEntity {
  id: string | number; // Primary ID
  name: string;
}

export const initComments = createAction('[Comments Page] Init');

export const loadCommentsSuccess = createAction(
  '[Comments/API] Load Comments Success',
  props<{ comments: CommentsEntity[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comments/API] Load Comments Failure',
  props<{ error: any }>()
);
