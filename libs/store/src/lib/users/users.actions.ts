import { createAction, createActionGroup, props } from '@ngrx/store';
import { UsersEntity } from './users.models';
import { User } from '@shared-store/utilities';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    '[User Page] Get User': props<{ userId: number }>(),
    '[User Page] Get User Success': props<{ user: User }>(),
    '[User Page] Get User Failure': props<{ error: string }>(),

    '[User Page] Add User': props<{ selectedUserId: number }>(),
    // add success action based on effect
    // add failure action based on effect (clearing state)

    '[User Page] Update User': props<{ selectedUserId: number }>(),
    // update success action based on effect
    // update failure action based on effect (clearing state)
  },
});

// export const initUsers = createAction('[Users Page] Init');

// export const loadUsersSuccess = createAction(
//   '[Users/API] Load Users Success',
//   props<{ users: UsersEntity[] }>()
// );

// export const loadUsersFailure = createAction(
//   '[Users/API] Load Users Failure',
//   props<{ error: any }>()
// );
