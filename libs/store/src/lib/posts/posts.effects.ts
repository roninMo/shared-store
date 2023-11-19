/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsActions } from './posts.actions';
import { UserActions } from '../users';
import { catchError, concatMap, map, of } from 'rxjs';
import { ApiService, Post, jsonApiRoute_Base } from '@shared-store/utilities';



@Injectable()
export class PostsEffects {
  protected action$ = inject(Actions);
  protected http$ = inject(ApiService)

  getUserPosts$ = createEffect(() => 
    this.action$.pipe( 
      ofType(UserActions['[UserPage]GetUser'] || PostsActions['[UserPosts]GetAllPost']),
      concatMap((event) => {
        return this.http$
          .get<Post[]>(`${jsonApiRoute_Base}/users/${event.userId}/posts`)
          .pipe(
            map((posts) => {
              // console.info('get user posts effect api call: ', posts);
              return PostsActions['[UserPosts]GetAllPostSuccess']({ 
                userId: event.userId, posts 
              });
            }),
            catchError((error) => {
              console.error('get user posts api error: ', error);
              return of(
                PostsActions['[UserPosts]GetAllPostFailure']({ 
                  userId: event.userId, error 
                })
              );
            })
          )
      })
    )
  );

  getPost$ = createEffect(() => 
    this.action$.pipe(
      ofType(PostsActions['[UserPosts]GetPost']),
      concatMap((event) => {
        return this.http$
        .get<Post>(`${jsonApiRoute_Base}/post/${event.postId}`)
        .pipe(
          map(post => {
            // console.info('get post effect api call: ', post);
            return PostsActions['[UserPosts]GetPostSuccess']({ userId: event.userId, post });
          }),
          catchError((error) => {
            console.error('get post api error: ', error);
            return of(PostsActions['[UserPosts]GetPostFailure']({ postId: event.userId, error }));
          })
        )
      })
    )
  );

  addPost$ = createEffect(() => 
    this.action$.pipe(
      ofType(PostsActions['[UserPosts]AddPost']),
      concatMap((event) => {
        return this.http$
        .post<Post>(`${jsonApiRoute_Base}/post`, event.post)
        .pipe(
          map(post => {
            // console.info('create post effect api call: ', post);
            return PostsActions['[UserPosts]AddPostSuccess']({ userId: event.userId, post });
          }),
          catchError((error) => {
            console.error('create post api error: ', error);
            return of(PostsActions['[UserPosts]AddPostFailure']({ postId: event.userId, error }));
          })
        )
      })
    )
  );

  deletePost$ = createEffect(() => 
    this.action$.pipe(
      ofType(PostsActions['[UserPosts]DeletePost']),
      concatMap((event) => {
        return this.http$
        .delete(`${jsonApiRoute_Base}/post/${event.postId}`)
        .pipe(
          map(post => {
            // console.info('delete post effect api call: ', post);
            return PostsActions['[UserPosts]DeletePostSuccess']({ userId: event.userId, postId: event.postId });
          }),
          catchError((error) => {
            console.error('delete post api error: ', error);
            return of(PostsActions['[UserPosts]DeletePostFailure']({ postId: event.userId, error }));
          })
        )
      })
    )
  );

  updatePost$ = createEffect(() => 
    this.action$.pipe(
      ofType(PostsActions['[UserPosts]UpdatePost']),
      concatMap((event) => {
        return this.http$
        .put<Post>(`${jsonApiRoute_Base}/post/${event.post.id}`, event.post)
        .pipe(
          map(post => {
            // console.info('update post effect api call: ', post);
            return PostsActions['[UserPosts]UpdatePostSuccess']({ userId: event.userId, post });
          }),
          catchError((error) => {
            console.error('update post api error: ', error);
            return of(PostsActions['[UserPosts]UpdatePostFailure']({ postId: event.userId, error }));
          })
        )
      })
    )
  );
}