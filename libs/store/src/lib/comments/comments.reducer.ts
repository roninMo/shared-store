import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CommentsActions from './comments.actions';
import { CommentsEntity } from './comments.models';

export const COMMENTS_FEATURE_KEY = 'comments';

export interface CommentsState extends EntityState<CommentsEntity> {
  selectedId?: string | number; // which Comments record has been selected
  loaded: boolean; // has the Comments list been loaded
  error?: string | null; // last known error (if any)
}

export interface CommentsPartialState {
  readonly [COMMENTS_FEATURE_KEY]: CommentsState;
}

export const commentsAdapter: EntityAdapter<CommentsEntity> =
  createEntityAdapter<CommentsEntity>();

export const initialCommentsState: CommentsState =
  commentsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialCommentsState,
  on(CommentsActions.initComments, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CommentsActions.loadCommentsSuccess, (state, { comments }) =>
    commentsAdapter.setAll(comments, { ...state, loaded: true })
  ),
  on(CommentsActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function commentsReducer(
  state: CommentsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
