import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  clearCompleted,
  setTodos,
  addTodoSuccess,
} from "../actions/todosActions"; // Исправление: используем createAction, а не константы

import {
  fetchTodos as fetchTodosApi,
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  toggleTodo as toggleTodoApi,
  editTodo as editTodoApi,
  clearCompleted as clearCompletedApi,
} from "../../api/todosApi";

// --- Sagas ---
function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = yield call(addTodoApi, action.payload);
    yield put(addTodoSuccess(newTodo)); // Убедитесь, что newTodo содержит все данные
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodoApi, action.payload); // Предполагаем, что payload - это ID задачи
    yield put(deleteTodo(action.payload)); // Диспетчеризуем экшен с ID
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

function* toggleTodoSaga(action) {
  try {
    const updatedTodo = yield call(toggleTodoApi, action.payload); // Передаем ID задачи
    yield put(toggleTodo(updatedTodo.id)); // Используем только ID задачи, если это ожидается
  } catch (error) {
    console.error("Failed to toggle todo:", error);
  }
}

function* editTodoSaga(action) {
  try {
    const updatedTodo = yield call(
      editTodoApi,
      action.payload.id,
      action.payload.text
    );
    yield put(editTodo(updatedTodo.id, updatedTodo.text)); // Передаем обновленные данные
  } catch (error) {
    console.error("Failed to edit todo:", error);
  }
}

function* clearCompletedSaga() {
  try {
    yield call(clearCompletedApi);
    yield put(clearCompleted());
  } catch (error) {
    console.error("Failed to clear completed todos:", error);
  }
}

// --- Watcher ---
function* watchTodos() {
  yield takeEvery(fetchTodos, fetchTodosSaga); // Используем экшен из createAction
  yield takeEvery(addTodo, addTodoSaga); // Используем экшен из createAction
  yield takeEvery(deleteTodo, deleteTodoSaga);
  yield takeEvery(toggleTodo, toggleTodoSaga);
  yield takeEvery(editTodo, editTodoSaga);
  yield takeEvery(clearCompleted, clearCompletedSaga);
}

// --- Root saga ---
export default function* rootSaga() {
  yield all([watchTodos()]);
}
