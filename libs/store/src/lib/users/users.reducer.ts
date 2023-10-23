import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from './users.actions';
import { User } from '@shared-store/utilities';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export function selectUserId(user: User): string {
  return user.id.toString();
}

export function sortByName(a: User, b: User): number {
  return a.name.localeCompare(b.name);
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const userReducers = createReducer(
  initialUsersState,

  // Get user
  on(UserActions['[UserPage]GetUser'], (state, action) => {
    console.log(`get user[${action.userId}]: `, { state, action });
    return { ...state, selectedId: action.userId, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]GetUserSuccess'], (state, action) => {
    console.log('get user success: ', { state, action });
    return usersAdapter.setOne(action.user, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]GetUserFailure'], (state, action) => {
    console.log('get user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Add user
  on(UserActions['[UserPage]AddUser'], (state, action) => {
    console.log(`add user[${action.user.id}]: `, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]AddUserSuccess'], (state, action) => {
    console.log('add user success: ', { state, action });
    return usersAdapter.addOne(action.user, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]AddUserFailure'], (state, action) => {
    console.log('add user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Delete user
  on(UserActions['[UserPage]DeleteUser'], (state, action) => {
    console.log(`delete user[${action.userId}]: `, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]DeleteUserSuccess'], (state, action) => {
    console.log('delete user success: ', { state, action });
    return usersAdapter.removeOne(action.userId, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]DeleteUserFailure'], (state, action) => {
    console.log('delete user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Update user
  on(UserActions['[UserPage]UpdateUser'], (state, action) => {
    console.log(`update user[${action.user.id}]: `, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]UpdateUserSuccess'], (state, action) => {
    console.log('update user success: ', { state, action });
    const updatedUser: Update<User> = {
      id: action.user.id,
      changes: action.user,
    };

    return usersAdapter.updateOne(updatedUser, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]UpdateUserFailure'], (state, action) => {
    console.log('update user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  })
);
