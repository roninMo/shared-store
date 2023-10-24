import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Comment } from '@shared-store/utilities';
import { CommentsActions } from './comments.actions';
import { UserActions } from '../users';

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

function selectCommentId(comment: Comment): string {
  return comment.id.toString();
}

function sortByName(a: Comment, b: Comment): number {
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
  on(CommentsActions['[PostsComments]GetAllComments'], (state, action) => {
    console.info(`get comments for post ${action.postId}`, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(CommentsActions['[PostsComments]GetAllCommentsSuccess'], (state, action) => {
    console.info(`get comments for post ${action.postId} success`, {state, action});
    return commentsAdapter.addMany(action.comments, { ...state, loaded: true });
  }),
  on(CommentsActions['[PostsComments]GetAllCommentsFailure'], (state, action) => {
    console.error(`get comments for post ${action.postId} failure`);
    return { ...state, loaded: true, error: action.error}
  })
);
