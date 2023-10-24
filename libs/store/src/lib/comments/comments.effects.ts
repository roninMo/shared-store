import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map } from 'rxjs';
import { CommentsActions } from './comments.actions';
import { ApiService } from '../api.service';
import { Comment, jsonApiRoute_Base } from '@shared-store/utilities';
import { UserActions } from '../users';

@Injectable()
export class CommentsEffects {
  protected actions$ = inject(Actions);
  protected http$ = inject(ApiService);

  getAllUserComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        // UserActions['[UserPage]GetUser'] ||
        CommentsActions['[PostsComments]GetAllComments']
      ),
      concatMap((event) => {
        return this.http$
          .get<Comment[]>(`${jsonApiRoute_Base}/post/${event.postId}/comments`)
          .pipe(
            map((comments) => {
              console.info('get user comments effect api call: ', comments);
              return CommentsActions['[PostsComments]GetAllCommentsSuccess']({ 
                postId: event.postId, 
                comments 
              });
            }),
            catchError((error) => {
              console.error('get user comments api error: ', error);
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
}
