import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todosReducer from "../features/todos/todosSlice";
import rootSaga from "../sagas/rootSaga";

// Создаем middleware для саги
const sagaMiddleware = createSagaMiddleware();

// Конфигурация Redux store с подключением саги
export const store = configureStore({
  reducer: {
    todos: todosReducer, // Редьюсер для todos
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Отключаем thunk, так как используем саги
    }).concat(sagaMiddleware), // Добавляем middleware для саги
});

// Запуск rootSaga
sagaMiddleware.run(rootSaga);
