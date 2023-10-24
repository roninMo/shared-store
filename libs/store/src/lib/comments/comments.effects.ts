import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map } from 'rxjs';
import { CommentsActions } from './comments.actions';
import { ApiService } from '../api.service';
import { Comment, jsonApiRoute_Base } from '@shared-store/utilities';

@Injectable()
export class CommentsEffects {
  protected actions$ = inject(Actions);
  protected http$ = inject(ApiService);

  getCommentsForPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions['[PostsComments]GetAllComments']),
      concatMap((event) => {
        return this.http$
          .get<Comment[]>(`${jsonApiRoute_Base}/posts/${event.postId}/comments`)
          .pipe(
            map((comments) => {
              // console.info('get post comments effect api call: ', comments);
              return CommentsActions['[PostsComments]GetAllCommentsSuccess']({ 
                postId: event.postId, 
                comments 
              });
            }),
            catchError((error) => {
              console.error('get post comments api error: ', error);
              return of(
                CommentsActions['[PostsComments]GetAllCommentsFailure']({ 
                  postId: event.postId, error 
                })
              );
            })
          )
      })
    )
  );

  getComment$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CommentsActions['[PostsComments]GetComment']),
      concatMap((event) => {
        return this.http$
          .get<Comment>(`${jsonApiRoute_Base}/comments/${event.commentId}`)
          .pipe(
            map((comment) => {
              // console.info('get comment effect api call: ', comment);
              return CommentsActions['[PostsComments]GetCommentSuccess']({ postId: event.postId, comment });
            }),
            catchError((error) => {
              console.error('get post comments api error: ', error);
              return of(
                CommentsActions['[PostsComments]GetCommentFailure']({ 
                  postId: event.postId, error 
                })
              );
            })
          )
      })
    )
  );
  
  addCommernt$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CommentsActions['[PostsComments]AddComment']),
      concatMap((event) => {
        return this.http$
          .post<Comment>(`${jsonApiRoute_Base}/comments`, event.comment)
          .pipe(
            map((comment) => {
              // console.info('add comment effect api call: ', comment);
              return CommentsActions['[PostsComments]AddCommentSuccess']({ postId: event.postId, comment });
            }),
            catchError((error) => {
              console.error('add post comments api error: ', error);
              return of(
                CommentsActions['[PostsComments]AddCommentFailure']({ 
                  postId: event.postId, error 
                })
              );
            })
          )
      })
    )
  );
  
  deleteCommernt$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CommentsActions['[PostsComments]DeleteComment']),
      concatMap((event) => {
        return this.http$
          .delete(`${jsonApiRoute_Base}/comments/${event.commentId}`)
          .pipe(
            map((comment) => {
              // console.info('delete comment effect api call: ', comment);
              return CommentsActions['[PostsComments]DeleteCommentSuccess']({ postId: event.postId, commentId: event.commentId });
            }),
            catchError((error) => {
              console.error('delete post comments api error: ', error);
              return of(
                CommentsActions['[PostsComments]DeleteCommentFailure']({ 
                  postId: event.postId, error 
                })
              );
            })
          )
      })
    )
  );
  
  updateComment$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CommentsActions['[PostsComments]UpdateComment']),
      concatMap((event) => {
        return this.http$
          .put<Comment>(`${jsonApiRoute_Base}/comments/${event.comment.id}`, event.comment)
          .pipe(
            map((comment) => {
              // console.info('update comment effect api call: ', comment);
              return CommentsActions['[PostsComments]UpdateCommentSuccess']({ postId: event.postId, comment });
            }),
            catchError((error) => {
              console.error('update post comments api error: ', error);
              return of(
                CommentsActions['[PostsComments]UpdateCommentFailure']({ 
                  postId: event.postId, error 
                })
              );
            })
          )
      })
    )
  );
}
