import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  CommentsEntity,
  initComments,
  loadCommentsFailure,
  loadCommentsSuccess,
} from './comments.actions';

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
  on(initComments, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(loadCommentsSuccess, (state, { comments }) =>
    commentsAdapter.setAll(comments, { ...state, loaded: true })
  ),
  on(loadCommentsFailure, (state, { error }) => ({
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
