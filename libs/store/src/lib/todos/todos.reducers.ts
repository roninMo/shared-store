import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Todo } from "@shared-store/utilities";
import { TodosActions } from "./todos.actions";



// Todos state
export const TODOS_FEATURE_KEY = 'todos';
export interface TodosState extends EntityState<Todo> {
  selectedId?: string | number; // which Todos record has been selected
  loaded: boolean; // has the Todos list been loaded
  error?: string | null; // last known error (if any)
}

export interface TodosPartialState {
  readonly [TODOS_FEATURE_KEY]: TodosState;
}

function selectTodoId(user: Todo): string {
  return user.id.toString();
}

function sortByName(a: Todo, b: Todo): number {
  return a.title.localeCompare(b.title);
}

export const todosAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: selectTodoId,
  sortComparer: sortByName,
});

export const initialTodosState: TodosState = todosAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const todoReducer = createReducer(
  initialTodosState,

  on(TodosActions["[UserTodos]GetAllTodos"], (state, action) => {
    console.info('get user todos: ', {state, action});
    return { ...state, loaded: false, error: null };
  }),
  on(TodosActions["[UserTodos]GetAllTodosSuccess"], (state, action) => {
    console.info(`get todos for user ${action.userId} success`, {state, action});
    return todosAdapter.addMany(action.todos, { ...state, loaded: true });
  }),
  on(TodosActions["[UserTodos]GetAllTodosFailure"], (state, action) => {
    console.error(`get todos for user ${action.userId} failure`);
    return { ...state, loaded: true, error: action.error};
  })
);