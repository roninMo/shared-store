import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map, tap } from 'rxjs';
import { User, jsonApiRoute_Base } from '@shared-store/utilities';
import { UserActions } from '..';
import { ApiService } from '../api.service';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private http = inject(ApiService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions['[UserPage]GetUser']),
      concatMap(() => {
        return this.http.get<User>(`${jsonApiRoute_Base}/users/1`).pipe(
          tap((data) => console.log('\n\nincoming getUser api data: ', data)),
          map((user) => {
            console.log('get user effect api call: ', user);

            // Return api success action
            return UserActions['[UserPage]GetUserSuccess']({
              user: user,
            });
          }),
          catchError((error) => {
            console.log('get user effect api error: ', error);

            return of(UserActions['[UserPage]GetUserFailure']({ error }));
          })
        );

        // return of(
        //   UserActions['[UserPage]GetUserSuccess']({ user: {} as User })
        // );
      })
    )
  );
}
