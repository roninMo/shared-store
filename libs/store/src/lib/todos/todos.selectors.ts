import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TODOS_FEATURE_KEY, TodosState, todosAdapter } from "./todos.reducers";

// Lookup the 'Todos' feature state managed by NgRx
export const selectTodosState =
  createFeatureSelector<TodosState>(TODOS_FEATURE_KEY);

const { selectAll, selectEntities } = todosAdapter.getSelectors();

export const selectTodosLoaded = createSelector(
  selectTodosState,
  (state: TodosState) => state.loaded
);

export const selectTodosError = createSelector(
  selectTodosState,
  (state: TodosState) => state.error
);

export const selectAllTodos = createSelector(
  selectTodosState,
  (state: TodosState) => selectAll(state)
);

export const selectTodosEntities = createSelector(
  selectTodosState,
  (state: TodosState) => selectEntities(state)
);

export const selectSelectedTodo = createSelector(
  selectTodosState,
  (state: TodosState) => state?.entities[state.selectedId!] || null
);

export const selectTodoById = (id: number) =>
  createSelector(
    selectTodosState,
    (state: TodosState) => state?.entities[id] || null
  );

export const selectAllUserTodos = (userId: number) =>
  createSelector(
    selectAllTodos,
    (todos) => todos?.filter(todos => todos.userId == userId)
  );