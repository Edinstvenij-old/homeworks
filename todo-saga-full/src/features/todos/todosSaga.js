import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
} from "../../api/todoApi"; // Объединяем импорты
import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  CLEAR_COMPLETED_REQUEST,
  SYNC_WITH_LOCAL_STORAGE,
  CLEAR_LOCAL_STORAGE,
  setError,
} from "./todosActions";
import {
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  deleteTodoSuccess,
  toggleTodoSuccess,
  editTodoSuccess,
  //incrementPage,
  setTasks,
} from "./todosSlice";
import {
  addTaskToLocalStorage,
  updateTaskInLocalStorage,
  deleteTaskFromLocalStorage,
  getTasksFromLocalStorage,
  clearTasksFromLocalStorage,
} from "../../utils/localStorageUtils";

// Worker для загрузки задач с сервера
function* fetchTodosWorker(action) {
  try {
    const { page = 1, pageSize = 10 } = action.payload || {};

    const response = yield call(getTodos, page, pageSize);

    console.log("Ответ от API:", response);

    const tasks = response; // response — это сразу массив задач

    if (Array.isArray(tasks)) {
      yield put(setTasks(tasks));
    } else {
      throw new Error("Некорректные данные: ожидался массив задач");
    }
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    yield put(setError(error.message));
  }
}

function* addTodoWorker(action) {
  try {
    const todo = action.payload;
    const createdTask = yield call(addTodo, todo);

    if (!createdTask) throw new Error("Ошибка при добавлении задачи на сервер");

    yield call(addTaskToLocalStorage, createdTask);
    yield put(addTodoSuccess(createdTask));
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    yield put(
      fetchTodosFailure(error.message || "Ошибка при добавлении задачи")
    );
  }
}

// Worker для удаления задачи
function* deleteTodoWorker(action) {
  try {
    const taskId = action.payload;

    yield call(deleteTodo, taskId);
    yield call(deleteTaskFromLocalStorage, taskId);

    yield put(deleteTodoSuccess(taskId));
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    yield put(fetchTodosFailure(error.message || "Ошибка при удалении задачи"));
  }
}

function* toggleTodoWorker(action) {
  try {
    const { id, completed } = action.payload;
    const updatedTask = yield call(toggleTodo, id, completed);

    if (!updatedTask) throw new Error("Ошибка при переключении статуса задачи");

    yield call(updateTaskInLocalStorage, updatedTask);
    yield put(toggleTodoSuccess(updatedTask));
  } catch (error) {
    console.error("Ошибка при переключении состояния задачи:", error);
    yield put(
      fetchTodosFailure(error.message || "Ошибка при переключении задачи")
    );
  }
}

function* editTodoWorker(action) {
  try {
    const { id, todo } = action.payload;
    const updatedTask = yield call(editTodo, id, todo);

    if (!updatedTask) throw new Error("Ошибка при редактировании задачи");

    yield call(updateTaskInLocalStorage, updatedTask);
    yield put(editTodoSuccess(updatedTask));
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error);
    yield put(
      fetchTodosFailure(error.message || "Ошибка при редактировании задачи")
    );
  }
}

// Worker для очистки завершённых задач
function* clearCompletedWorker() {
  try {
    const todos = yield select((state) => state.todos.tasks);

    if (!Array.isArray(todos)) {
      throw new Error("Неверный формат задач");
    }

    const completedTodos = todos.filter((todo) => todo.completed);

    for (const todo of completedTodos) {
      yield call(deleteTodo, todo.id);
      yield call(deleteTaskFromLocalStorage, todo.id);
      yield put(deleteTodoSuccess(todo.id));
    }
  } catch (error) {
    console.error("Ошибка при очистке завершённых задач:", error);
    yield put(fetchTodosFailure(error.message || "Ошибка при очистке задач"));
  }
}

// Worker для синхронизации с локальным хранилищем
function* syncWithLocalStorageWorker() {
  try {
    const tasks = yield call(getTasksFromLocalStorage);

    if (!Array.isArray(tasks)) {
      throw new Error("Ошибка получения данных из локального хранилища");
    }

    yield put(fetchTodosSuccess(tasks));
  } catch (error) {
    console.error("Ошибка при синхронизации с локальным хранилищем:", error);
    yield put(fetchTodosFailure(error.message || "Ошибка при синхронизации"));
  }
}

// Worker для очистки локального хранилища
function* clearLocalStorageWorker() {
  try {
    yield call(clearTasksFromLocalStorage);
    yield put(fetchTodosSuccess([]));
  } catch (error) {
    console.error("Ошибка при очистке локального хранилища:", error);
    yield put(
      fetchTodosFailure(
        error.message || "Ошибка при очистке локального хранилища"
      )
    );
  }
}

// Основная сага
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
