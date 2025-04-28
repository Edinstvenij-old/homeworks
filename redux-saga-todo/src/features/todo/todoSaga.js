import { call, put, takeLatest } from "redux-saga/effects";
import {
  setTodos,
  addTodo,
  removeTodo,
  updateTodo,
  setLoading,
  setError,
} from "./todoSlice";
import {
  fetchTodos,
  addTodo as addApiTodo,
  deleteTodo,
  updateTodo as updateApiTodo,
  markTodoComplete,
  clearCompletedTodos,
} from "../../api/todoApi"; // Добавьте правильный импорт

function* fetchTodosSaga() {
  try {
    yield put(setLoading(true));
    const todos = yield call(fetchTodos); // Вызываем API для получения TODO
    yield put(setTodos(todos));
  } catch (error) {
    yield put(setError(error.message || "Произошла ошибка при загрузке задач"));
  } finally {
    yield put(setLoading(false));
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = yield call(addApiTodo, action.payload); // Вызываем API для добавления TODO
    yield put(addTodo(newTodo));
  } catch (error) {
    yield put(
      setError(error.message || "Произошла ошибка при добавлении задачи")
    );
  }
}

function* removeTodoSaga(action) {
  try {
    yield call(deleteTodo, action.payload); // Вызываем API для удаления TODO
    yield put(removeTodo(action.payload));
  } catch (error) {
    yield put(
      setError(error.message || "Произошла ошибка при удалении задачи")
    );
  }
}

function* updateTodoSaga(action) {
  try {
    const updatedTodo = yield call(
      updateApiTodo,
      action.payload.id,
      action.payload
    ); // Вызываем API для обновления TODO
    yield put(updateTodo(updatedTodo));
  } catch (error) {
    yield put(
      setError(error.message || "Произошла ошибка при обновлении задачи")
    );
  }
}

function* markTodoCompleteSaga(action) {
  try {
    const updatedTodo = yield call(markTodoComplete, action.payload); // Вызываем API для отметки TODO как выполненное
    yield put(updateTodo(updatedTodo));
  } catch (error) {
    yield put(
      setError(
        error.message || "Произошла ошибка при обновлении статуса задачи"
      )
    );
  }
}

function* clearCompletedTodosSaga() {
  try {
    yield call(clearCompletedTodos); // Вызываем API для очистки выполненных TODO
    yield put(fetchTodos()); // Перезагружаем список TODO после очистки
  } catch (error) {
    yield put(
      setError(
        error.message || "Произошла ошибка при очистке выполненных задач"
      )
    );
  }
}

// Запускаем все саги
export default function* todoSaga() {
  yield takeLatest("todos/fetchTodos", fetchTodosSaga);
  yield takeLatest("todos/addTodo", addTodoSaga);
  yield takeLatest("todos/removeTodo", removeTodoSaga);
  yield takeLatest("todos/updateTodo", updateTodoSaga);
  yield takeLatest("todos/markTodoComplete", markTodoCompleteSaga);
  yield takeLatest("todos/clearCompletedTodos", clearCompletedTodosSaga);
}
