import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { EnvironmentProviders, Provider, isDevMode } from '@angular/core';
import {
  USERS_FEATURE_KEY,
  userReducers,
  UsersEffects,
  COMMENTS_FEATURE_KEY,
  CommentsEffects,
  commentReducers,
  POSTS_FEATURE_KEY,
  postsReducers,
  PostsEffects,
  TODOS_FEATURE_KEY,
  todoReducer,
  TodoEffects,
} from '@shared-store/shared-store';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { UsersPageComponent } from './pages/UsersPage/users-page.component';
import { FormControlsComponent } from './pages/input/FormControls.component';

const storeProviders: (Provider | EnvironmentProviders)[]  = [
  // Users
  provideState(USERS_FEATURE_KEY, userReducers),
  provideEffects(UsersEffects),

  // Posts
  provideState(POSTS_FEATURE_KEY, postsReducers),
  provideEffects(PostsEffects),

  // Comments
  provideState(COMMENTS_FEATURE_KEY, commentReducers),
  provideEffects(CommentsEffects),

  // Todos
  provideState(TODOS_FEATURE_KEY, todoReducer),
  provideEffects(TodoEffects),
];

export const appRoutes: Route[] = [
  // Routes
  {
    path: 'home',
    pathMatch: 'full',
    component: HomePageComponent,
    providers: storeProviders,
    // children: [
    //   { path: '', redirectTo: 'information', pathMatch: 'full' },
    //   { path: 'information', component: UserInformationComponent },
    //   { path: 'add', component: AddUserFormComponent },
    //   { path: 'remove', component: RemoveUserComponent },
    //   { path: 'update', component: UpdateUserFormComponent },
    // ]
  },
  {
    path: 'users',
    component: UsersPageComponent,
    providers: storeProviders,
  },
  {
    path: 'formControls',
    component: FormControlsComponent,
    providers: storeProviders
  },
  
  // Redirects
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'user', redirectTo: '/users' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: '**', component: HomePageComponent }, // Wildcard route for a 404 page
];
