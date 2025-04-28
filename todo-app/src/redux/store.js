import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/todosReducer";
import rootSaga from "./sagas/todosSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Включаем использование redux-thunk
    }).concat(sagaMiddleware), // Добавляем redux-saga
  devTools: import.meta.env.MODE !== "production",
});

sagaMiddleware.run(rootSaga);

export default store;
