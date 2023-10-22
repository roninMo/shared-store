import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as CommentsActions from './comments.actions';
import * as CommentsFeature from './comments.reducer';

@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.initComments),
      switchMap(() =>
        of(CommentsActions.loadCommentsSuccess({ comments: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(CommentsActions.loadCommentsFailure({ error }));
      })
    )
  );
}
