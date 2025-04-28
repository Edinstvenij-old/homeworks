import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todoReducer from "../features/todo/todoSlice";
import todoSaga from "../features/todo/todoSaga";

// Створюємо saga middleware
const sagaMiddleware = createSagaMiddleware();

// Налаштовуємо store з middleware
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Додаємо sagaMiddleware до стандартних middleware
});

// Запускаємо саги
sagaMiddleware.run(todoSaga);

export default store;
