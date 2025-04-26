import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  FETCH_TODOS,
  setTodos,
  ADD_TODO,
  addTodoSuccess,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  CLEAR_COMPLETED,
} from "../actions/todosActions";

import {
  fetchTodos as fetchTodosApi,
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  toggleTodo as toggleTodoApi,
  editTodo as editTodoApi,
  clearCompleted as clearCompletedApi,
} from "../../api/todosApi";

// Загружаем todos только при первом рендере или при необходимости
function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
}

// --- Локальные CRUD операции ---
function* addTodoSaga(action) {
  try {
    const newTodo = yield call(addTodoApi, action.payload);
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodoApi, action.payload);
    yield put({
      type: DELETE_TODO,
      payload: action.payload,
    });
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

function* toggleTodoSaga(action) {
  try {
    yield call(toggleTodoApi, action.payload);
    yield put({
      type: TOGGLE_TODO,
      payload: action.payload,
    });
  } catch (error) {
    console.error("Failed to toggle todo:", error);
  }
}

function* editTodoSaga(action) {
  try {
    yield call(editTodoApi, action.payload.id, action.payload.text);
    yield put({
      type: EDIT_TODO,
      payload: action.payload,
    });
  } catch (error) {
    console.error("Failed to edit todo:", error);
  }
}

function* clearCompletedSaga() {
  try {
    yield call(clearCompletedApi);
    yield put({
      type: CLEAR_COMPLETED,
    });
  } catch (error) {
    console.error("Failed to clear completed todos:", error);
  }
}

function* watchTodos() {
  yield takeEvery(FETCH_TODOS, fetchTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
  yield takeEvery(TOGGLE_TODO, toggleTodoSaga);
  yield takeEvery(EDIT_TODO, editTodoSaga);
  yield takeEvery(CLEAR_COMPLETED, clearCompletedSaga);
}

export default function* rootSaga() {
  yield all([watchTodos()]);
}
