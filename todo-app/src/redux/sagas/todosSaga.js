import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  fetchTodosFromAPI,
  addTodoAsync,
  deleteTodoFromAPI,
  editTodoOnAPI,
  addTodoLocal,
  deleteTodoLocal,
  toggleTodoLocal,
  editTodoLocal,
  clearCompletedLocal,
  setTodos,
  addTodoSuccess,
  addTodoError,
  deleteTodoSuccess,
  deleteTodoError,
  toggleTodoSuccess,
  editTodoSuccess,
  clearCompletedSuccess,
} from "../actions/todosActions";

import {
  fetchTodos as fetchTodosApi,
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  editTodo as editTodoApi,
  toggleTodo as toggleTodoApi,
} from "../../api/todosApi";

// --- Служебные функции ---
const saveToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

// --- Саги ---

// Загрузка задач
function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
}

// Добавление локальной задачи
function* addTodoLocalSaga(action) {
  try {
    const newTodo = action.payload;
    const localTodos = loadFromLocalStorage();
    const updatedTodos = [...localTodos, newTodo];
    saveToLocalStorage(updatedTodos);
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    console.error("Failed to add local todo:", error);
  }
}

// Удаление локальной задачи
function* deleteTodoLocalSaga(action) {
  try {
    const id = action.payload;
    const localTodos = loadFromLocalStorage();
    const updatedTodos = localTodos.filter((todo) => todo.id !== id);
    saveToLocalStorage(updatedTodos);
    yield put(deleteTodoSuccess(id));
  } catch (error) {
    console.error("Failed to delete local todo:", error);
  }
}

// Переключение локальной задачи
function* toggleTodoLocalSaga(action) {
  try {
    const id = action.payload;
    const localTodos = loadFromLocalStorage();
    const updatedTodos = localTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveToLocalStorage(updatedTodos);
    const toggledTodo = updatedTodos.find((todo) => todo.id === id);
    yield put(toggleTodoSuccess(toggledTodo));
  } catch (error) {
    console.error("Failed to toggle local todo:", error);
  }
}

// Редактирование локальной задачи
function* editTodoLocalSaga(action) {
  try {
    const { id, text } = action.payload;
    const localTodos = loadFromLocalStorage();
    const updatedTodos = localTodos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    saveToLocalStorage(updatedTodos);
    const editedTodo = updatedTodos.find((todo) => todo.id === id);
    yield put(editTodoSuccess(editedTodo));
  } catch (error) {
    console.error("Failed to edit local todo:", error);
  }
}

// Очистка завершенных локальных задач
function* clearCompletedLocalSaga() {
  try {
    const localTodos = loadFromLocalStorage();
    const activeTodos = localTodos.filter((todo) => !todo.completed);
    saveToLocalStorage(activeTodos);
    yield put(clearCompletedSuccess());
  } catch (error) {
    console.error("Failed to clear completed todos locally:", error);
  }
}

// Добавление задачи через API
function* addTodoAsyncSaga(action) {
  try {
    const text = action.payload;
    const newTodo = yield call(addTodoApi, { text });
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    yield put(addTodoError(error.message));
  }
}

// Удаление задачи через API
function* deleteTodoFromAPISaga(action) {
  try {
    const id = action.payload;
    yield call(deleteTodoApi, id);
    yield put(deleteTodoSuccess(id));
  } catch (error) {
    yield put(deleteTodoError(error.message));
  }
}

// Редактирование задачи через API
function* editTodoOnAPISaga(action) {
  try {
    const { id, text } = action.payload;
    const updatedTodo = yield call(editTodoApi, id, text);
    yield put(editTodoSuccess(updatedTodo));
  } catch (error) {
    console.error("Failed to edit todo via API:", error);
  }
}

// --- Вотчеры ---
function* watchTodos() {
  yield takeEvery(fetchTodosFromAPI.type, fetchTodosSaga); // Используйте .type, если используете экшен с типами
  yield takeEvery(addTodoLocal.type, addTodoLocalSaga);
  yield takeEvery(deleteTodoLocal.type, deleteTodoLocalSaga);
  yield takeEvery(toggleTodoLocal.type, toggleTodoLocalSaga);
  yield takeEvery(editTodoLocal.type, editTodoLocalSaga);
  yield takeEvery(clearCompletedLocal.type, clearCompletedLocalSaga);
  yield takeEvery(addTodoAsync.type, addTodoAsyncSaga); // Также используйте .type для экшенов
  yield takeEvery(deleteTodoFromAPI.type, deleteTodoFromAPISaga);
  yield takeEvery(editTodoOnAPI.type, editTodoOnAPISaga);
}

// --- Корневая сага ---
export default function* rootSaga() {
  yield all([watchTodos()]);
}
