import { createActionGroup, props } from "@ngrx/store";
import { Todo } from "@shared-store/utilities";

export const TodosActions = createActionGroup({
  source: 'Users',
  events: {
    // Get all user todos
    '[User Todos] Get All Todos': props<{ userId: number }>(),
    '[User Todos] Get All Todos Success': props<{ userId: number, todos: Todo[] }>(),
    '[User Todos] Get All Todos Failure': props<{ error: string, userId: number }>(),

    // Get
    '[User Todos] Get Todo': props<{ userId: number, todoId: number }>(),
    '[User Todos] Get Todo Success': props<{ userId: number, todo: Todo }>(),
    '[User Todos] Get Todo Failure': props<{ error: string, userId: number }>(),

    // Add
    '[User Todos] Add Todo': props<{ userId: number, todo: Todo }>(),
    '[User Todos] Add Todo Success': props<{ userId: number, todo: Todo }>(),
    '[User Todos] Add Todo Failure': props<{ error: string, userId: number }>(),

    // Delete
    '[User Todos] Delete Todo': props<{ userId: number, todoId: number }>(),
    '[User Todos] Delete Todo Success': props<{ userId: number, todoId: number }>(),
    '[User Todos] Delete Todo Failure': props<{ error: string, userId: number }>(),

    // Update
    '[User Todos] Update Todo': props<{ userId: number, todo: Todo }>(),
    '[User Todos] Update Todo Success': props<{ userId: number, todo: Todo }>(),
    '[User Todos] Update Todo Failure': props<{ error: string, userId: number }>(),
  },
});