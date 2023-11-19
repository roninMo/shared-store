/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, concatMap, map } from 'rxjs';
import { ApiService, User, jsonApiRoute_Base } from '@shared-store/utilities';
import { UserActions } from '..';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private http = inject(ApiService);

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions['[UserPage]GetUser']),
      concatMap((event) => {
        return this.http
          .get<User>(`${jsonApiRoute_Base}/users/${event.userId}`)
          .pipe(
            // tap((data) => console.info('\n\nincoming getUser api data: ', data)),
            map((user) => {
              // console.info('get user effect api call: ', user);
              return UserActions['[UserPage]GetUserSuccess']({
                user: user,
              });
            }),
            catchError((error) => {
              console.error('get user api error: ', error);
              return of(UserActions['[UserPage]GetUserFailure']({ error }));
            })
          );

        // return of(
        //   UserActions['[UserPage]GetUserSuccess']({ user: {} as User })
        // );
      })
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions['[UserPage]AddUser']),
      concatMap((event) => {
        return this.http
          .post<User>(`${jsonApiRoute_Base}/users`, event.user)
          .pipe(
            // tap((data) => console.info('\n\nincoming addUser api data: ', data)),
            map((user) => {
              // console.info('add user effect api call: ', user);
              return UserActions['[UserPage]AddUserSuccess']({
                user: user,
              });
            }),
            catchError((error) => {
              console.error('add user api error: ', error);

              return of(UserActions['[UserPage]AddUserFailure']({ error }));
            })
          );
      })
    )
  );

  deleteUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions['[UserPage]DeleteUser']),
      concatMap((event) => {
        return this.http
          .delete(`${jsonApiRoute_Base}/users/${event.userId}`)
          .pipe(
            map((user) => {
              // console.info('delete user effect api call: ', user);
              return UserActions['[UserPage]DeleteUserSuccess']({
                userId: event.userId,
              });
            }),
            catchError((error) => {
              console.error('delete user api error: ', error);
              return of(UserActions['[UserPage]DeleteUserFailure']({ error }));
            })
          );
      })
    )
  );

  updateUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UserActions['[UserPage]UpdateUser']),
      concatMap((event) => {

        console.log('update user event data', {event, url: `${jsonApiRoute_Base}/users/${event.user.id}`});
        return this.http
          .put<User>(`${jsonApiRoute_Base}/users/${event.user.id}`, event.user)
          .pipe(
            map((user) => {
              // console.info('update user effect api call', user);
              return UserActions['[UserPage]UpdateUserSuccess']({ user });
            }),
            catchError((error) => {
              console.error('update user api error: ', error);
              return of(UserActions['[UserPage]UpdateUserFailure']({ error }));
            })
          )
      })
    )
  );
}
