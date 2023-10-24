import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
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
} from '@shared-store/shared-store';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { UsersPageComponent } from './pages/UsersPage/users-page.component';

export const appRoutes: Route[] = [
  // Routes
  {
    path: 'home',
    pathMatch: 'full',
    component: HomePageComponent,
    providers: [
      provideStoreDevtools({ logOnly: !isDevMode() }),

      // Users
      provideState(USERS_FEATURE_KEY, userReducers),
      provideEffects(UsersEffects),

      // Posts
      provideState(POSTS_FEATURE_KEY, postsReducers),
      provideEffects(PostsEffects),

      // Comments
      provideState(COMMENTS_FEATURE_KEY, commentReducers),
      provideEffects(CommentsEffects),
    ],
  },
  {
    path: 'users',
    component: UsersPageComponent,
    providers: [
      provideStoreDevtools({ logOnly: !isDevMode() }),
      
      // Users
      provideState(USERS_FEATURE_KEY, userReducers),
      provideEffects(UsersEffects),

      // Posts
      provideState(POSTS_FEATURE_KEY, postsReducers),
      provideEffects(PostsEffects),

      // Comments
      provideState(COMMENTS_FEATURE_KEY, commentReducers),
      provideEffects(CommentsEffects),
    ]
  },

  // Redirects
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'user', redirectTo: '/users', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: '**', component: HomePageComponent }, // Wildcard route for a 404 page
];
