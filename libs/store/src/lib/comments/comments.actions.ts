import { createAction, props } from '@ngrx/store';
import { CommentsEntity } from './comments.models';

export const initComments = createAction('[Comments Page] Init');

export const loadCommentsSuccess = createAction(
  '[Comments/API] Load Comments Success',
  props<{ comments: CommentsEntity[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comments/API] Load Comments Failure',
  props<{ error: any }>()
);
