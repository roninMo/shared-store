import { createFeatureSelector, createSelector } from "@ngrx/store";
import { POSTS_FEATURE_KEY, PostsState, postsAdapter } from "./posts.reducers";

// Lookup the 'Posts' feature state managed by NgRx
export const selectPostsState =
  createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

const { selectAll, selectEntities } = postsAdapter.getSelectors();

export const selectPostsLoaded = createSelector(
  selectPostsState,
  (state: PostsState) => state.loaded
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state: PostsState) => state.error
);

export const selectAllPosts = createSelector(
  selectPostsState,
  (state: PostsState) => selectAll(state)
);

export const selectPostsEntities = createSelector(
  selectPostsState,
  (state: PostsState) => selectEntities(state)
);

export const selectSelectedPost = createSelector(
  selectPostsState,
  (state: PostsState) => state?.entities[state.selectedId!] || null
);

export const selectPostById = (id: number) =>
  createSelector(
    selectPostsState,
    (state: PostsState) => state?.entities[id] || null
  );

export const selectAllUserPosts = (userId: number) =>
  createSelector(
    selectAllPosts,
    (posts) => posts?.filter(post => post.userId == userId)
  );