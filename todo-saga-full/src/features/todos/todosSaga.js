import { takeEvery, call, put, select } from "redux-saga/effects";
import * as api from "../../api/todoApi";
import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  CLEAR_COMPLETED_REQUEST,
  SYNC_WITH_LOCAL_STORAGE,
  CLEAR_LOCAL_STORAGE,
} from "./todosActions";
import {
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  deleteTodoSuccess,
  toggleTodoSuccess,
  editTodoSuccess,
  incrementPage,
} from "./todosSlice";
import {
  addTaskToLocalStorage,
  updateTaskInLocalStorage,
  deleteTaskFromLocalStorage,
  getTasksFromLocalStorage,
  clearTasksFromLocalStorage,
} from "../../utils/localStorageUtils";

// Получение задач с учетом пагинации
function* fetchTodosWorker() {
  const { page, pageSize } = yield select((state) => state.todos);

  try {
    const { data } = yield call(api.getTodos, page, pageSize); // Пагинация с сервером
    if (data && Array.isArray(data.todos)) {
      yield put(fetchTodosSuccess(data.todos)); // Обновляем задачи в стейте

      // Обновляем страницу после загрузки
      yield put(incrementPage());
    } else {
      throw new Error("Некорректные данные от сервера");
    }
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
    console.error("Ошибка при получении задач с сервера:", error);
  }
}

// Добавление задачи
function* addTodoWorker(action) {
  try {
    const { data } = yield call(api.addTodo, action.payload);
    if (data) {
      // Добавляем задачу на сервере и сохраняем локально
      addTaskToLocalStorage(data);
      yield put(addTodoSuccess(data));
    }
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
  }
}

// Удаление задачи
function* deleteTodoWorker(action) {
  try {
    const taskId = action.payload;
    yield call(api.deleteTodo, taskId);
    // Удаляем задачу с сервера и из локального хранилища
    deleteTaskFromLocalStorage(taskId);
    yield put(deleteTodoSuccess(taskId));
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
}

// Переключение состояния задачи (например, завершена/не завершена)
function* toggleTodoWorker(action) {
  try {
    const { data } = yield call(
      api.toggleTodo,
      action.payload.id,
      action.payload.completed
    );
    if (data) {
      // Обновляем задачу как на сервере, так и в локальном хранилище
      updateTaskInLocalStorage(data);
      yield put(toggleTodoSuccess(data));
    }
  } catch (error) {
    console.error("Ошибка при переключении состояния задачи:", error);
  }
}

// Редактирование задачи
function* editTodoWorker(action) {
  try {
    const { data } = yield call(
      api.editTodo,
      action.payload.id,
      action.payload.todo
    );
    if (data) {
      // Обновляем задачу как на сервере, так и в локальном хранилище
      updateTaskInLocalStorage(data);
      yield put(editTodoSuccess(data));
    }
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error);
  }
}

// Очистка завершённых задач (удаляем их с сервера и из локального хранилища)
function* clearCompletedWorker() {
  try {
    const todos = yield select((state) => state.todos.tasks); // Получаем задачи из стейта
    if (!todos || !Array.isArray(todos)) {
      throw new Error("Таски не найдены или не правильного формата");
    }

    const completedTodos = todos.filter((todo) => todo.completed); // Фильтруем завершенные задачи

    for (const todo of completedTodos) {
      yield call(api.deleteTodo, todo.id); // Удаляем задачу с сервера
      deleteTaskFromLocalStorage(todo.id); // Удаляем задачу из локального хранилища
      yield put(deleteTodoSuccess(todo.id)); // Успешное удаление задачи из стейта
    }
  } catch (error) {
    console.error("Ошибка при очистке завершённых задач:", error);
  }
}

// Синхронизация с локальным хранилищем
function* syncWithLocalStorageWorker() {
  try {
    const tasks = yield call(getTasksFromLocalStorage); // Получаем задачи из локального хранилища
    if (Array.isArray(tasks)) {
      yield put(fetchTodosSuccess(tasks)); // Диспатчим задачи в стейт
    }
  } catch (error) {
    console.error("Ошибка при синхронизации с локальным хранилищем:", error);
  }
}

// Очистка локального хранилища
function* clearLocalStorageWorker() {
  try {
    yield call(clearTasksFromLocalStorage); // Очищаем локальное хранилище
    yield put(fetchTodosSuccess([])); // Обновляем стейт после очистки
  } catch (error) {
    console.error("Ошибка при очистке локального хранилища:", error);
  }
}

// Основная функция для запуска всех саг
export function* todosSaga() {
  yield takeEvery(FETCH_TODOS, fetchTodosWorker);
  yield takeEvery(ADD_TODO, addTodoWorker);
  yield takeEvery(DELETE_TODO, deleteTodoWorker);
  yield takeEvery(TOGGLE_TODO, toggleTodoWorker);
  yield takeEvery(EDIT_TODO, editTodoWorker);
  yield takeEvery(CLEAR_COMPLETED_REQUEST, clearCompletedWorker);
  yield takeEvery(SYNC_WITH_LOCAL_STORAGE, syncWithLocalStorageWorker);
  yield takeEvery(CLEAR_LOCAL_STORAGE, clearLocalStorageWorker);
}
