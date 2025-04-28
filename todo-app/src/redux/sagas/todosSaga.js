import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  fetchTodosFromAPI,
  addTodoLocal,
  deleteTodoLocal,
  toggleTodoLocal,
  editTodoLocal,
  clearCompletedLocal,
  addTodoAsync,
  deleteTodoFromAPI,
  editTodoOnAPI,
  toggleTodoFromAPI,
  setTodos,
  addTodoSuccess,
  addTodoError,
  deleteTodoSuccess,
  deleteTodoError,
  toggleTodoSuccess,
  toggleTodoError,
  editTodoSuccess,
  editTodoError,
  clearCompletedSuccess,
  fetchTodosError,
} from "../actions/todosActions"; // Ensure all actions are imported correctly
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
    yield put(fetchTodosError(error.message)); // Отправляем экшен об ошибке
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
    yield put(addTodoError(error.message)); // Отправляем экшен об ошибке
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
    yield put(deleteTodoError(error.message)); // Отправляем экшен об ошибке
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
    yield put(toggleTodoError(error.message)); // Отправляем экшен об ошибке
  }
}

// Переключение задачи через API
function* toggleTodoFromAPISaga(action) {
  try {
    const toggledTodo = yield call(toggleTodoApi, action.payload); // Используем toggleTodoApi, а не экшен
    yield put(toggleTodoSuccess(toggledTodo));
  } catch (error) {
    yield put(toggleTodoError(error.message));
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
    yield put(editTodoError(error.message)); // Отправляем экшен об ошибке
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
    yield put(addTodoError(error.message)); // Отправляем экшен об ошибке
  }
}

// Удаление задачи через API
function* deleteTodoFromAPISaga(action) {
  try {
    const id = action.payload;
    yield call(deleteTodoApi, id);
    yield put(deleteTodoSuccess(id));
  } catch (error) {
    yield put(deleteTodoError(error.message)); // Отправляем экшен об ошибке
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
    yield put(editTodoError(error.message)); // Отправляем экшен об ошибке
  }
}

// --- Вотчеры ---
// Прослушиваем все экшены
function* watchTodos() {
  yield takeEvery(fetchTodosFromAPI.type, fetchTodosSaga);
  yield takeEvery(addTodoLocal.type, addTodoLocalSaga);
  yield takeEvery(deleteTodoLocal.type, deleteTodoLocalSaga);
  yield takeEvery(toggleTodoLocal.type, toggleTodoLocalSaga);
  yield takeEvery(editTodoLocal.type, editTodoLocalSaga);
  yield takeEvery(clearCompletedLocal.type, clearCompletedLocalSaga);
  yield takeEvery(addTodoAsync.type, addTodoAsyncSaga);
  yield takeEvery(deleteTodoFromAPI.type, deleteTodoFromAPISaga);
  yield takeEvery(editTodoOnAPI.type, editTodoOnAPISaga);
  yield takeEvery(toggleTodoFromAPI.type, toggleTodoFromAPISaga);
}

// --- Корневая сага ---
export default function* rootSaga() {
  yield all([watchTodos()]);
}
