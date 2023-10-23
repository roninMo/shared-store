import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
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
  on(UserActions['[UserPage]GetUser'], (state, action) => {
    console.log(`get user[${action.userId}]: `, { state, action });
    return { ...state, selectedId: action.userId, loaded: false, error: null };
  }),
  on(UserActions['[UserPage]GetUserSuccess'], (state, action) => {
    // Handle state and accessing any linked information specific to this user before updating the state
    console.log('get user success: ', { state, action });

    return usersAdapter.setOne(action.user, { ...state, loaded: true });
    // return usersAdapter.addOne(action.user, { ...state, loaded: true });
  }),
  on(UserActions['[UserPage]GetUserFailure'], (state, action) => {
    // Handle state and accessing any linked information specific to this user before updating the state
    console.log('get user failure: ', { state, action });

    return { ...state, loaded: true, error: action.error };
  })

  //

  // on(UserActions['[UserPage]AddUser'], (state, action) => {
  //   // Handle state and accessing any linked information specific to this user before updating the state
  //   console.log('add user: ', { state, action });

  //   return { ...state, ...defaultStateProps, isLoading: true, action };
  // }),

  // on(UserActions['[UserPage]UpdateUser'], (state, action) => {
  //   // Search for this user within the state and update it here
  //   console.log('update user: ', { state, action });

  //   return { ...state, ...defaultStateProps, isLoading: true, action };
  // })
);

// const reducer = createReducer(
//   initialUsersState,
//   on(initUsers, (state) => ({
//     ...state,
//     loaded: false,
//     error: null,
//   })),
//   on(loadUsersSuccess, (state, { users }) =>
//     usersAdapter.setAll(users, { ...state, loaded: true })
//   ),
//   on(loadUsersFailure, (state, { error }) => ({ ...state, error }))
// );

// export function usersReducer(state: UsersState | undefined, action: Action) {
//   return reducer(state, action);
// }
