import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMMENTS_FEATURE_KEY,
  CommentsState,
  commentsAdapter,
} from './comments.reducer';
import { Comment } from '@shared-store/utilities';

// Lookup the 'Comments' feature state managed by NgRx
export const selectCommentsState =
  createFeatureSelector<CommentsState>(COMMENTS_FEATURE_KEY);

const { selectAll, selectEntities } = commentsAdapter.getSelectors();

export const selectCommentsLoaded = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.loaded
);

export const selectCommentsError = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.error
);

export const selectAllComments = createSelector(
  selectCommentsState,
  (state: CommentsState) => selectAll(state)
);

export const selectCommentsEntities = createSelector(
  selectCommentsState,
  (state: CommentsState) => selectEntities(state)
);

export const selectSelectedComment = createSelector(
  selectCommentsState,
  selectCommentsEntities,
  (state: CommentsState) => state?.entities[state.selectedId!] || null
);

export const selectCommentById = (commentId: number) =>
  createSelector(
    selectCommentsState,
    selectEntities,
    (state: CommentsState) => state?.entities[commentId] || null
  );

export const selectAllPostComments = (postId: number) =>
  createSelector(
    selectAllComments,
    (comments: Comment[]) => comments?.filter(comment => comment.postId == postId)
  );
