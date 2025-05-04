import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

if (process.env.NODE_ENV === "development") {
  window.store = store;
}

export default store;
