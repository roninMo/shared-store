import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COMMENTS_FEATURE_KEY,
  CommentsState,
  commentsAdapter,
} from './comments.reducer';

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
