import { createActionGroup, props } from '@ngrx/store';
import { User } from '@shared-store/utilities';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    // Get
    '[User Page] Get User': props<{ userId: number }>(),
    '[User Page] Get User Success': props<{ user: User }>(),
    '[User Page] Get User Failure': props<{ error: string }>(),

    // Add
    '[User Page] Add User': props<{ user: User }>(),
    '[User Page] Add User Success': props<{ user: User }>(),
    '[User Page] Add User Failure': props<{ error: string }>(),

    // Delete
    '[User Page] Delete User': props<{ userId: number }>(),
    '[User Page] Delete User Success': props<{ userId: number }>(),
    '[User Page] Delete User Failure': props<{ error: string }>(),

    // Update
    '[User Page] Update User': props<{ user: User }>(),
    '[User Page] Update User Success': props<{ user: User }>(),
    '[User Page] Update User Failure': props<{ error: string }>(),
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
