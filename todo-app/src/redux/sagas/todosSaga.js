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
  addTodoError, // Новый экшен для обработки ошибки добавления
  deleteTodoError, // Новый экшен для обработки ошибки удаления
} from "../actions/todosActions";

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
    // Можно добавить экшен для ошибок в fetch
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = action.payload; // Получаем объект с задачей
    if (typeof newTodo.text !== "string") {
      throw new Error("Text in newTodo is not a string!");
    }

    const response = yield call(addTodoApi, newTodo); // Отправляем объект задачи в API

    yield put(addTodoSuccess(response)); // Если все ок, передаем результат в экшен
  } catch (error) {
    console.error("Failed to add todo:", error);
    yield put(addTodoError(error.message)); // Отправляем экшен ошибки
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodoApi, action.payload); // Предполагаем, что payload - это ID задачи
    yield put(deleteTodo(action.payload)); // Диспетчеризуем экшен с ID
  } catch (error) {
    console.error("Failed to delete todo:", error);
    yield put(deleteTodoError(error.message)); // Отправляем экшен ошибки
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

    // Проверка на формат данных
    if (typeof updatedTodo.text !== "string") {
      throw new Error("Text in updatedTodo is not a string!");
    }

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
  yield takeEvery(fetchTodos, fetchTodosSaga);
  yield takeEvery(addTodo, addTodoSaga);
  yield takeEvery(deleteTodo, deleteTodoSaga);
  yield takeEvery(toggleTodo, toggleTodoSaga);
  yield takeEvery(editTodo, editTodoSaga);
  yield takeEvery(clearCompleted, clearCompletedSaga);
}

// --- Root saga ---
export default function* rootSaga() {
  yield all([watchTodos()]);
}
