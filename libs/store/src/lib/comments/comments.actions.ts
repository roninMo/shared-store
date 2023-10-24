import { createActionGroup, props } from '@ngrx/store';
import { Comment } from '@shared-store/utilities';

export const CommentsActions = createActionGroup({
  source: 'Comments',
  events: {
    // Get
    '[Posts Comments] Get Comment': props<{ postId: number, commentId: number }>(),
    '[Posts Comments] Get Comment Success': props<{ postId: number, comment: Comment }>(),
    '[Posts Comments] Get Comment Failure': props<{ postId: number, error: string }>(),

    // Get All
    '[Posts Comments] Get All Comments': props<{ postId: number }>(),
    '[Posts Comments] Get All Comments Success': props<{ postId: number, comments: Comment[] }>(),
    '[Posts Comments] Get All Comments Failure': props<{ postId: number, error: string }>(),

    // Add
    '[Posts Comments] Add Comment': props<{ postId: number, comment: Comment }>(),
    '[Posts Comments] Add Comment Success': props<{ postId: number, comment: Comment }>(),
    '[Posts Comments] Add Comment Failure': props<{ postId: number, error: string }>(),

    // Update
    '[Posts Comments] Update Comment': props<{ postId: number, comment: Comment }>(),
    '[Posts Comments] Update Comment Success': props<{ postId: number, comment: Comment }>(),
    '[Posts Comments] Update Comment Failure': props<{ postId: number, error: string }>(),

    // Delete
    '[Posts Comments] Delete Comment': props<{ postId: number, commentId: number }>(),
    '[Posts Comments] Delete Comment Success': props<{ postId: number, commentId: number }>(),
    '[Posts Comments] Delete Comment Failure': props<{ postId: number, error: string }>(),
  }
});
