import { createSlice } from "@reduxjs/toolkit";
import { CLEAR_COMPLETED } from "./todosActions";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTodosSuccess(state, action) {
      state.loading = false;
      state.items = action.payload;
    },
    fetchTodosFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoSuccess(state, action) {
      state.items.push(action.payload);
    },
    deleteTodoSuccess(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoSuccess(state, action) {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    editTodoSuccess(state, action) {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.todo = action.payload.todo;
      }
    },
    [CLEAR_COMPLETED](state) {
      state.items = state.items.filter((todo) => !todo.completed);
    },
  },
});

export const {
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  deleteTodoSuccess,
  toggleTodoSuccess,
  editTodoSuccess,
} = todosSlice.actions;

export default todosSlice.reducer;
