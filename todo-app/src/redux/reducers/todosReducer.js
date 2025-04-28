import { createReducer } from "@reduxjs/toolkit";
import {
  setTodos,
  deleteTodo,
  toggleTodo,
  editTodo,
  clearCompleted,
  setFilter,
  fetchTodosFromAPI,
  deleteTodoFromAPI,
  editTodoOnAPI,
  addTodoAsync,
} from "../actions/todosActions";
import {
  deleteLocalTodo,
  toggleLocalTodo,
  editLocalTodo,
  clearCompletedLocalTodos,
} from "../services/localStorageService";

const initialState = {
  local: [], // Локальные задачи
  server: [], // Задачи с сервера
  filter: "all", // Фильтр для задач
  loading: false, // Состояние загрузки
  error: null, // Ошибка
};

// Находит задачу по ID в массиве
const findTodoById = (todos, id) => todos.find((todo) => todo.id === id);

const todosReducer = createReducer(initialState, (builder) => {
  builder
    // Устанавливаем задачи с сервера
    .addCase(setTodos, (state, action) => {
      if (!action?.payload) return;
      state.server = action.payload;
    })

    // Загрузка задач с сервера
    .addCase(fetchTodosFromAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTodosFromAPI.fulfilled, (state, action) => {
      if (!action?.payload) return;
      state.server = action.payload;
      state.loading = false;
    })
    .addCase(fetchTodosFromAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Добавление новой задачи
    .addCase(addTodoAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addTodoAsync.fulfilled, (state, action) => {
      const newTodo = action.payload;
      state.server.push(newTodo); // Добавляем задачу на сервер
      state.local.push(newTodo); // Добавляем задачу в localStorage
      state.loading = false;
    })
    .addCase(addTodoAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Удаление задачи с сервера
    .addCase(deleteTodoFromAPI.fulfilled, (state, action) => {
      state.server = state.server.filter((todo) => todo.id !== action.payload);
    })

    // Редактирование задачи на сервере
    .addCase(editTodoOnAPI.fulfilled, (state, action) => {
      const idx = state.server.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (idx !== -1) {
        state.server[idx] = {
          ...state.server[idx],
          ...action.payload,
        };
      }
    })

    // Локальные действия
    .addCase(deleteTodo, (state, action) => {
      // Удаляем локальную задачу
      state.local = state.local.filter((todo) => todo.id !== action.payload);
      // Обновляем localStorage
      deleteLocalTodo(action.payload);
    })

    .addCase(toggleTodo, (state, action) => {
      const todo = findTodoById(state.local, action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        // Обновляем localStorage
        toggleLocalTodo(action.payload);
      }
    })

    .addCase(editTodo, (state, action) => {
      const todo = findTodoById(state.local, action.payload.id);
      if (todo) {
        todo.text = action.payload.text.trim();
        // Обновляем localStorage
        editLocalTodo(action.payload.id, action.payload.text.trim());
      }
    })

    .addCase(clearCompleted, (state) => {
      // Убираем завершенные задачи из локального хранилища
      const activeTodos = state.local.filter((todo) => !todo.completed);
      state.local = activeTodos;
      clearCompletedLocalTodos();
    })

    // Устанавливаем фильтр
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    });
});

export default todosReducer;
