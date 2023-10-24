import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from './users.actions';
import { User } from '@shared-store/utilities';

// Users state
export const USERS_FEATURE_KEY = 'users';
export interface UsersState extends EntityState<User> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

function selectUserId(user: User): string {
  return user.id.toString();
}

function sortByName(a: User, b: User): number {
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

// Reducer functions
export const userReducers = createReducer(
  initialUsersState,

  // Get user
  on(UserActions['[UserPage]GetUser'], (state, action) => {
    console.info(`\n\nget user[${action.userId}]: `, { state, action });
    return { ...state, selectedId: action.userId, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]GetUserSuccess'], (state, action) => {
    console.info('get user success: ', { state, action });
    return usersAdapter.setOne(action.user, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]GetUserFailure'], (state, action) => {
    console.warn('get user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Add user
  on(UserActions['[UserPage]AddUser'], (state, action) => {
    console.info(`add user[${action.user.id}]: `, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]AddUserSuccess'], (state, action) => {
    console.info('add user success: ', { state, action });
    return usersAdapter.addOne(action.user, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]AddUserFailure'], (state, action) => {
    console.warn('add user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Delete user
  on(UserActions['[UserPage]DeleteUser'], (state, action) => {
    console.info(`delete user[${action.userId}]: `, { state, action });
    return { ...state, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]DeleteUserSuccess'], (state, action) => {
    console.info('delete user success: ', { state, action });
    return usersAdapter.removeOne(action.userId, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]DeleteUserFailure'], (state, action) => {
    console.warn('delete user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  }),

  //

  // Update user
  on(UserActions['[UserPage]UpdateUser'], (state, action) => {
    console.info(`update user[${action.user.id}]: `, { state, action });
    return { ...state, selectedId: action.user.id, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]UpdateUserSuccess'], (state, action) => {
    console.info('update user success: ', { state, action });
    const updatedUser: Update<User> = {
      id: action.user.id,
      changes: action.user,
    };

    return usersAdapter.updateOne(updatedUser, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]UpdateUserFailure'], (state, action) => {
    console.warn('update user failure: ', { state, action });
    return { ...state, loaded: true, error: action.error };
  })
);

// const reducer = createReducer(
//   initialCommentsState,
//   on(initComments, (state) => ({
//     ...state,
//     loaded: false,
//     error: null,
//   })),
//   on(loadCommentsSuccess, (state, { comments }) =>
//     commentsAdapter.setAll(comments, { ...state, loaded: true })
//   ),
//   on(loadCommentsFailure, (state, { error }) => ({
//     ...state,
//     error,
//   }))
// );

// export function commentsReducer(
//   state: CommentsState | undefined,
//   action: Action
// ) {
//   return reducer(state, action);
// }
