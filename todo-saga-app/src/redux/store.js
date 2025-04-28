import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todosReducer from "./todos/todosSlice";
import todosSaga from "./todos/todosSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(todosSaga);

export default store;
