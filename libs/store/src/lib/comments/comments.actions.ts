import { createActionGroup, props } from '@ngrx/store';
import { Comment } from '@shared-store/utilities';

export const CommentActions = createActionGroup({
  source: 'Comments',
  events: {
    // Get
    '[User Comments] Get Comment': props<{
      userId: number;
      commentId: number;
    }>(),
    '[User Comments] Get Comment Success': props<{
      userId: number;
      comment: Comment;
    }>(),
    '[User Comments] Get Comment Failure': props<{ error: string }>(),

    // Get All
    '[User Comments] Get All Comment': props<{ userId: number }>(),
    '[User Comments] Get All Comment Success': props<{
      userId: number;
      comments: Comment[];
    }>(),
    '[User Comments] Get All Comment Failure': props<{ error: string }>(),

    // Add
    '[User Comments] Add Comment': props<{
      userId: number;
      comment: Comment;
    }>(),
    '[User Comments] Add Comment Success': props<{
      userId: number;
      comment: Comment;
    }>(),
    '[User Comments] Add Comment Failure': props<{ error: string }>(),

    // Update
    '[User Comments] Update Comment': props<{
      userId: number;
      comment: Comment;
    }>(),
    '[User Comments] Update Comment Success': props<{
      userId: number;
      comment: Comment;
    }>(),
    '[User Comments] Update Comment Failure': props<{ error: string }>(),

    // Delete
    '[User Comments] Delete Comment': props<{
      userId: number;
      commentId: number;
    }>(),
    '[User Comments] Delete Comment Success': props<{
      userId: number;
      commentId: number;
    }>(),
    '[User Comments] Delete Comment Failure': props<{ error: string }>(),
  },
});
