import { createAction } from "@reduxjs/toolkit";

// Экшены для задач
export const loadTodos = createAction("LOAD_TODOS");
export const setTodos = createAction("SET_TODOS");
export const fetchTodos = createAction("FETCH_TODOS");

// Экшен для добавления новой задачи
export const addTodo = createAction("ADD_TODO", (text) => {
  if (!text || typeof text !== "string" || text.trim() === "") {
    throw new Error("Text is invalid or empty");
  }
  return { payload: text.trim() };
});

// Экшен для успешного добавления задачи
export const addTodoSuccess = createAction("ADD_TODO_SUCCESS");

// Экшен для ошибки при добавлении задачи
export const addTodoError = createAction("ADD_TODO_ERROR");

// Экшен для удаления задачи
export const deleteTodo = createAction("DELETE_TODO");

// Экшен для переключения статуса задачи
export const toggleTodo = createAction("TOGGLE_TODO");

// Экшен для редактирования задачи
export const editTodo = createAction("EDIT_TODO", (id, text) => {
  if (!text || typeof text !== "string" || text.trim() === "") {
    throw new Error("Text is invalid or empty");
  }
  return { payload: { id, text: text.trim() } };
});

// Экшен для очистки завершённых задач
export const clearCompleted = createAction("CLEAR_COMPLETED");

// Экшен для изменения фильтра задач
export const setFilter = createAction("SET_FILTER");
