import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  getTodosApi,
  addTodoApi,
  deleteTodoApi,
  toggleTodoApi,
  updateTodoApi,
} from "../../api/todosApi";

import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  updateTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
} from "./todosSlice";

// Отримання списку todo
function* fetchTodosSaga() {
  try {
    const todos = yield call(getTodosApi);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Додавання нового todo
function* addTodoSaga(action) {
  try {
    yield call(addTodoApi, action.payload);
    yield put(fetchTodosRequest()); // після додавання оновити список
  } catch (error) {
    console.error("Add todo error:", error.message);
  }
}

// Оновлення тексту todo
function* updateTodoSaga(action) {
  try {
    yield call(updateTodoApi, action.payload);
    yield put(fetchTodosRequest());
  } catch (error) {
    console.error("Update todo error:", error.message);
  }
}

// Переключення виконання todo
function* toggleTodoSaga(action) {
  try {
    yield call(toggleTodoApi, action.payload);
    yield put(fetchTodosRequest());
  } catch (error) {
    console.error("Toggle todo error:", error.message);
  }
}

// Видалення todo
function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodoApi, action.payload);
    yield put(fetchTodosRequest());
  } catch (error) {
    console.error("Delete todo error:", error.message);
  }
}

// Головна сага
export default function* todosSaga() {
  yield all([
    takeEvery(fetchTodosRequest.type, fetchTodosSaga),
    takeEvery(addTodoRequest.type, addTodoSaga),
    takeEvery(updateTodoRequest.type, updateTodoSaga),
    takeEvery(toggleTodoRequest.type, toggleTodoSaga),
    takeEvery(deleteTodoRequest.type, deleteTodoSaga),
  ]);
}
