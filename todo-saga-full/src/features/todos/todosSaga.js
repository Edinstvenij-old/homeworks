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

// Функция загрузки задач
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
      payload: { error: error.message, source: "fetchTodosWorker" },
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
      payload: { error: error.message, source: "addTodoWorker" },
    });
  }
}

// Удаление задачи
function* deleteTodoWorker(action) {
  try {
    yield call(
      axios.delete,
      `https://jsonplaceholder.typicode.com/todos/${action.payload}`
    );
    yield put({ type: DELETE_TODO_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({
      type: DELETE_TODO_FAILURE,
      payload: { error: error.message, source: "deleteTodoWorker" },
    });
  }
}

// Редактирование задачи
function* editTodoWorker(action) {
  try {
    const { id, title } = action.payload;

    if (!title || title.trim() === "") {
      throw new Error("Заголовок задачи не может быть пустым");
    }

    const response = yield call(
      axios.put,
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { title }
    );

    if (response.status === 200) {
      yield put({ type: EDIT_TODO_SUCCESS, payload: response.data });
    } else {
      yield put({
        type: EDIT_TODO_FAILURE,
        payload: { id, error: "Ошибка на сервере", source: "editTodoWorker" },
      });
    }
  } catch (error) {
    yield put({
      type: EDIT_TODO_FAILURE,
      payload: {
        id: action.payload.id,
        error: error.message || "Неизвестная ошибка",
        source: "editTodoWorker",
      },
    });
  }
}

// Переключение выполнено/не выполнено
function* toggleTodoWorker(action) {
  try {
    const { id, completed } = action.payload;
    const response = yield call(
      axios.patch,
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed }
    );
    yield put({ type: TOGGLE_TODO_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: TOGGLE_TODO_FAILURE,
      payload: { error: error.message, source: "toggleTodoWorker" },
    });
  }
}

// Очистка всех завершённых задач (локально и на сервере)
function* clearCompletedWorker() {
  try {
    const completedTasks = yield select((state) =>
      state.todos.tasks.filter((task) => task.completed)
    );

    const serverCompletedTasks = completedTasks.filter(
      (task) => task.id <= 200
    );

    yield all(
      serverCompletedTasks.map((task) =>
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
      payload: { error: error.message, source: "clearCompletedWorker" },
    });
  }
}

function* todosSaga() {
  yield takeEvery(FETCH_TODOS, fetchTodosWorker);
  yield takeEvery(ADD_TODO, addTodoWorker);
  yield takeEvery(DELETE_TODO, deleteTodoWorker);
  yield takeEvery(EDIT_TODO, editTodoWorker);
  yield takeEvery(TOGGLE_TODO, toggleTodoWorker);
  yield takeEvery(CLEAR_COMPLETED, clearCompletedWorker);
}

export default todosSaga;
