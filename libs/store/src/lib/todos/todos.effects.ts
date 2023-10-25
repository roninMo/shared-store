import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../api.service";
import { UserActions } from "../users";
import { catchError, concatMap, map, of } from "rxjs";
import { Todo, jsonApiRoute_Base } from "@shared-store/utilities";
import { TodosActions } from './todos.actions';

@Injectable()
export class TodoEffects {
  protected action$ = inject(Actions);
  protected http = inject(ApiService);

  $getUserTodos = createEffect(() => 
    this.action$.pipe(
      ofType(UserActions["[UserPage]GetUser"] || TodosActions["[UserTodos]GetAllTodos"]),
      concatMap((event) => {
        return this.http
          .get<Todo[]>(`${jsonApiRoute_Base}/users/${event.userId}/todos`)
          .pipe(
            map((todos: Todo[]) => {
              // console.info(`get user ${event.userId} todos success`, {event, todos});
              return TodosActions["[UserTodos]GetAllTodosSuccess"]({ todos, userId: event.userId });
            }),
            catchError((error) => {
              return of(TodosActions["[UserTodos]GetAllTodosFailure"]({ error, userId: event.userId }));
            })
          )
      })
    )
  );
}