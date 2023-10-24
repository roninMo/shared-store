import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Post } from "@shared-store/utilities";
import { PostsActions } from "./posts.actions";

// Comments state
export const POSTS_FEATURE_KEY = 'posts';
export interface PostsState extends EntityState<Post> {
  selectedId?: string | number; // which Comments record has been selected
  loaded: boolean; // has the Comments list been loaded
  error?: string | null; // last known error (if any)
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

function selectCommentId(comment: Post): string {
  return comment.id.toString();
}

function sortByName(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}

export const postsAdapter: EntityAdapter<Post> =
  createEntityAdapter<Post>({
    selectId: selectCommentId,
    sortComparer: sortByName,
  });

export const initialPostsState: PostsState =
postsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

// Reducer functions
export const postsReducers = createReducer(
  initialPostsState,
  
  // Get all posts of user
  on(PostsActions["[UserPosts]GetAllPost"], (state, action) => {
    console.info(`get posts for user ${action.userId}`, {state, action});
    return { ...state, loaded: false };
  }),
  on(PostsActions["[UserPosts]GetAllPostSuccess"], (state, action) => {
    console.info(`get posts for user ${action.userId} success`, {state, action});
    return postsAdapter.addMany(action.posts, { ...state, loaded: true, error: null });
  }),
  on(PostsActions["[UserPosts]GetAllPostFailure"], (state, action) => {
    console.warn(`get posts for user ${action.userId} failure`, { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Get post
  on(PostsActions["[UserPosts]GetPost"], (state, action) => {
    console.info(`get post ${action.postId}`, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(PostsActions["[UserPosts]GetPostSuccess"], (state, action) => {
    console.info(`get post ${action.post.id} success`, { state, action });
    return postsAdapter.addOne(action.post, { ...state, loaded: true, error: null });
  }),
  on(PostsActions["[UserPosts]GetPostFailure"], (state, action) => {
    console.warn(`get post ${action.postId} failure`, { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Add post
  on(PostsActions["[UserPosts]AddPost"], (state, action) => {
    console.info(`add post ${action.post.id}`, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(PostsActions["[UserPosts]AddPostSuccess"], (state, action) => {
    console.info(`add post ${action.post.id} success`, { state, action });
    return postsAdapter.addOne(action.post, { ...state, loaded: true, error: null });
  }),
  on(PostsActions["[UserPosts]AddPostFailure"], (state, action) => {
    console.warn(`add post ${action.postId} failure`, { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Delete post
  on(PostsActions["[UserPosts]DeletePost"], (state, action) => {
    console.info(`delete post ${action.postId}`, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(PostsActions["[UserPosts]DeletePostSuccess"], (state, action) => {
    console.info(`delete post ${action.postId} success`, { state, action });
    return postsAdapter.removeOne(action.postId, { ...state, loaded: true, error: null });
  }),
  on(PostsActions["[UserPosts]DeletePostFailure"], (state, action) => {
    console.warn(`delete post ${action.postId} failure`, { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Delete post
  on(PostsActions["[UserPosts]UpdatePost"], (state, action) => {
    console.info(`delete post ${action.post.id}`, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(PostsActions["[UserPosts]UpdatePostSuccess"], (state, action) => {
    console.info(`delete post ${action.post.id} success`, { state, action });
    const updatedPost: Update<Post> = {
      id: action.post.id,
      changes: action.post
    };

    return postsAdapter.updateOne(updatedPost, { ...state, loaded: true, error: null });
  }),
  on(PostsActions["[UserPosts]DeletePostFailure"], (state, action) => {
    console.warn(`delete post ${action.postId} failure`, { state, action });
    return { ...state, loaded: true, error: action.error };
  })
);
