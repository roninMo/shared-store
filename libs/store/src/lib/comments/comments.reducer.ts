import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  initComments,
  loadCommentsFailure,
  loadCommentsSuccess,
} from './comments.actions';
import { Comment } from '@shared-store/utilities';

// Comments state
export const COMMENTS_FEATURE_KEY = 'comments';
export interface CommentsState extends EntityState<Comment> {
  selectedId?: string | number; // which Comments record has been selected
  loaded: boolean; // has the Comments list been loaded
  error?: string | null; // last known error (if any)
}

export interface CommentsPartialState {
  readonly [COMMENTS_FEATURE_KEY]: CommentsState;
}

export function selectCommentId(comment: Comment): string {
  return comment.id.toString();
}

export function sortByName(a: Comment, b: Comment): number {
  return a.name.localeCompare(b.name);
}

export const commentsAdapter: EntityAdapter<Comment> =
  createEntityAdapter<Comment>({
    selectId: selectCommentId,
    sortComparer: sortByName,
  });

export const initialCommentsState: CommentsState =
  commentsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

// Reducer functions
export const commentReducers = createReducer(
  initialCommentsState,

  on(comment)
);

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
