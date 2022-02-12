import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TodoAPI } from "../api/todoAPI";
import { firestoreDB } from "../config/firebaseConfig";

export const TODO_LIST_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  LOADING_ERROR: "loading_error",
};

export const TODO_ENTITY_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  LOADING_ERROR: "loading_error",
  REMOVING: "removing",
  REMOVING_ERROR: "removing_error",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    status: TODO_LIST_STATUS.IDLE,
    entities: {},
    nextLoadSegmentPath: null,
  },
  reducers: {
    todosLoading: (state) => {
      state.status = TODO_LIST_STATUS.LOADING;
    },
    todosLoaded: (state, action) => {
      const payload = action.payload;
      const newEntities = {};
      payload["entities"].forEach((todo) => {
        newEntities[todo.id] = todo;
      });
      state.entities = { ...state.entities, ...newEntities };
      state.nextLoadSegmentPath = payload["nextLoadSegmentPath"];
      state.status = TODO_LIST_STATUS.IDLE;
    },
    todosLoadedFailure: (state) => {
      state.status = TODO_LIST_STATUS.LOADING_ERROR;
    },
    todoAdded: (state, action) => {
      const payload = action.payload;
      state.entities[payload.id] = payload;
      state.form_status = TODO_ENTITY_STATUS.IDLE;
    },
    todoRemoving: (state, action) => {
      const payload = action.payload;
      state.entities[payload.id]["status"] = TODO_ENTITY_STATUS.REMOVING;
    },
    todoRemoved: (state, action) => {
      const payload = action.payload;
      delete state.entities[payload.id];
    },
    todoRemovedFailure: (state, action) => {
      const payload = action.payload;
      state.entities[payload.id]["status"] = TODO_ENTITY_STATUS.REMOVING_ERROR;
    },
  },
});

export default todoSlice.reducer;

export const {
  todosLoading,
  todosLoaded,
  todosLoadedFailure,
  todoAdded,
  todoRemoving,
  todoRemoved,
  todoRemovedFailure,
} = todoSlice.actions;

export const selectTodoEntities = (state) => state.todos.entities;
export const selectTodos = createSelector(selectTodoEntities, (entities) => {
  return Object.values(entities);
});
export const selectTodoStatus = (state) => state.todos.status;
export const selectTodoNextLoadSegmentPath = (state) =>
  state.todos.nextLoadSegmentPath;
export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId];
};
export const selectSortedTodos = createSelector(selectTodos, (todos) => {
  return todos.sort((a, b) => b.createdAt - a.createdAt);
});

export class TodosThunk {
  static getAll(nextLoadSegmentPath) {
    return async (dispatch) => {
      dispatch(todosLoading());

      TodoAPI.getAll(firestoreDB, nextLoadSegmentPath)
        .then((response) => dispatch(todosLoaded(response)))
        .catch(() => dispatch(todosLoadedFailure()));
    };
  }

  static remove(todo) {
    return async (dispatch) => {
      dispatch(todoRemoving(todo));

      TodoAPI.remove(todo.segmentPath, firestoreDB)
        .then((response) => dispatch(todoRemoved(todo)))
        .catch(() => dispatch(todoRemovedFailure()));
    };
  }
}
