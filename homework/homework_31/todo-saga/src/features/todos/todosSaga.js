import { takeEvery, put, call, select, all } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  EDIT_TODO,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,
  TOGGLE_TODO,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILURE,
  CLEAR_COMPLETED,
  CLEAR_COMPLETED_SUCCESS,
  CLEAR_COMPLETED_FAILURE,
} from "./todosActions";

let nextLocalId = 101;
const getLocalId = () => {
  if (nextLocalId > 200) nextLocalId = 101;
  return nextLocalId++;
};

// === WORKERS ===

// Загрузка задач с сервера
function* fetchTodosWorker() {
  try {
    const response = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    yield put({ type: FETCH_TODOS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: FETCH_TODOS_FAILURE,
      payload: error.message,
      meta: { source: "fetchTodosWorker" },
    });
  }
}

// Добавление задачи (локально)
function* addTodoWorker(action) {
  try {
    const newTodo = { ...action.payload, id: getLocalId() };
    yield put({ type: ADD_TODO_SUCCESS, payload: newTodo });
  } catch (error) {
    yield put({
      type: ADD_TODO_FAILURE,
      payload: error.message,
      meta: { source: "addTodoWorker" },
    });
  }
}

// Удаление задачи
function* deleteTodoWorker(action) {
  const id = action.payload;

  try {
    if (id <= 200) {
      yield call(
        axios.delete,
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
    }
    yield put({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (error) {
    yield put({
      type: DELETE_TODO_FAILURE,
      payload: error.message,
      meta: { source: "deleteTodoWorker", id },
    });
  }
}

// Редактирование задачи
function* editTodoWorker(action) {
  const { id, title } = action.payload;

  try {
    if (!title?.trim()) {
      throw new Error("Заголовок задачи не может быть пустым");
    }

    if (id > 200) {
      yield put({ type: EDIT_TODO_SUCCESS, payload: action.payload });
      return;
    }

    const response = yield call(
      axios.put,
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { title }
    );

    yield put({ type: EDIT_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: EDIT_TODO_FAILURE,
      payload: error.message,
      meta: { source: "editTodoWorker", id },
    });
  }
}

// Переключение выполнено/не выполнено
function* toggleTodoWorker(action) {
  const { id, completed } = action.payload;

  try {
    if (id > 200) {
      yield put({ type: TOGGLE_TODO_SUCCESS, payload: action.payload });
      return;
    }

    const response = yield call(
      axios.patch,
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed }
    );

    yield put({ type: TOGGLE_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: TOGGLE_TODO_FAILURE,
      payload: error.message,
      meta: { source: "toggleTodoWorker", id },
    });
  }
}

// Очистка завершённых задач
function* clearCompletedWorker() {
  try {
    const completedTasks = yield select((state) =>
      state.todos.tasks.filter((task) => task.completed)
    );

    const serverTasks = completedTasks.filter((task) => task.id <= 200);

    yield all(
      serverTasks.map((task) =>
        call(
          axios.delete,
          `https://jsonplaceholder.typicode.com/todos/${task.id}`
        )
      )
    );

    yield put({ type: CLEAR_COMPLETED_SUCCESS });
  } catch (error) {
    yield put({
      type: CLEAR_COMPLETED_FAILURE,
      payload: error.message,
      meta: { source: "clearCompletedWorker" },
    });
  }
}

// === ROOT SAGA ===

function* todosSaga() {
  yield all([
    takeEvery(FETCH_TODOS, fetchTodosWorker),
    takeEvery(ADD_TODO, addTodoWorker),
    takeEvery(DELETE_TODO, deleteTodoWorker),
    takeEvery(EDIT_TODO, editTodoWorker),
    takeEvery(TOGGLE_TODO, toggleTodoWorker),
    takeEvery(CLEAR_COMPLETED, clearCompletedWorker),
  ]);
}

export default todosSaga;
