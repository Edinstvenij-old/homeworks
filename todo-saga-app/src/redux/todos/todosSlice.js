import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess(state, action) {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoRequest(state, action) {},
    updateTodoRequest(state, action) {},
    toggleTodoRequest(state, action) {},
    deleteTodoRequest(state, action) {},
    clearTodosRequest(state) {
      state.todos = []; // просто очищає локально
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  updateTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  clearTodosRequest,
} = todosSlice.actions;

export default todosSlice.reducer;
