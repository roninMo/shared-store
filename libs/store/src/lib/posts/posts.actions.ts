import { createActionGroup, props } from "@ngrx/store";
import { Post } from "@shared-store/utilities";

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    // Get
    '[User Posts] Get Post': props<{ userId: number, postId: number }>(),
    '[User Posts] Get Post Success': props<{ userId: number, post: Post }>(),
    '[User Posts] Get Post Failure': props<{ postId: number, error: string }>(),

    // Get All
    '[User Posts] Get All Post': props<{ userId: number }>(),
    '[User Posts] Get All Post Success': props<{ userId: number, posts: Post[] }>(),
    '[User Posts] Get All Post Failure': props<{ userId: number, error: string }>(),

    // Add
    '[User Posts] Add Post': props<{ userId: number, post: Post }>(),
    '[User Posts] Add Post Success': props<{ userId: number, post: Post }>(),
    '[User Posts] Add Post Failure': props<{ postId: number, error: string }>(),

    // Update
    '[User Posts] Update Post': props<{ userId: number, post: Post }>(),
    '[User Posts] Update Post Success': props<{ userId: number, post: Post }>(),
    '[User Posts] Update Post Failure': props<{ postId: number, error: string }>(),

    // Delete
    '[User Posts] Delete Post': props<{ userId: number, postId: number }>(),
    '[User Posts] Delete Post Success': props<{ userId: number, postId: number }>(),
    '[User Posts] Delete Post Failure': props<{ postId: number, error: string }>(),
  }
});
