import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../../api/todoApi";
import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
} from "./todosActions";
import {
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  deleteTodoSuccess,
  toggleTodoSuccess,
  editTodoSuccess,
} from "./todosSlice";

function* fetchTodosWorker() {
  try {
    const { data } = yield call(api.getTodos);
    yield put(fetchTodosSuccess(data.todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* addTodoWorker(action) {
  try {
    const { data } = yield call(api.addTodo, action.payload);
    yield put(addTodoSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

function* deleteTodoWorker(action) {
  try {
    yield call(api.deleteTodo, action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    console.error(error);
  }
}

function* toggleTodoWorker(action) {
  try {
    const { data } = yield call(
      api.toggleTodo,
      action.payload.id,
      action.payload.completed
    );
    yield put(toggleTodoSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

function* editTodoWorker(action) {
  try {
    const { data } = yield call(
      api.editTodo,
      action.payload.id,
      action.payload.todo
    );
    yield put(editTodoSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

export function* todosSaga() {
  yield takeEvery(FETCH_TODOS, fetchTodosWorker);
  yield takeEvery(ADD_TODO, addTodoWorker);
  yield takeEvery(DELETE_TODO, deleteTodoWorker);
  yield takeEvery(TOGGLE_TODO, toggleTodoWorker);
  yield takeEvery(EDIT_TODO, editTodoWorker);
}
