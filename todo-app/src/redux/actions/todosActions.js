import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Универсальные функции для проверки данных
const validateText = (text) => {
  if (!text || typeof text !== "string" || text.trim() === "") {
    throw new Error("Text is invalid or empty");
  }
};

const validateId = (id) => {
  if (!id || typeof id !== "string") {
    throw new Error("Valid ID is required");
  }
};

// Экшены для задач
export const loadTodos = createAction("LOAD_TODOS");
export const setTodos = createAction("SET_TODOS");
export const fetchTodos = createAction("FETCH_TODOS");

export const addTodo = createAction("ADD_TODO", (text) => {
  console.log("Adding todo with text:", text);

  if (typeof text !== "string") {
    console.warn("Text is not a string:", text);
    throw new Error("Text must be a string");
  }

  const id = uuidv4();
  return { payload: { id, text: text.trim(), completed: false } };
});

// Экшен для успешного добавления задачи
export const addTodoSuccess = createAction("ADD_TODO_SUCCESS", (todo) => {
  if (!todo || !todo.id || !todo.text) {
    console.warn("Invalid todo data:", todo);
    throw new Error("Invalid todo data");
  }
  return { payload: todo };
});

// Экшен для ошибки при добавлении задачи
export const addTodoError = createAction("ADD_TODO_ERROR", (error) => {
  if (!error || typeof error !== "string") {
    console.warn("Invalid error message:", error);
    throw new Error("Error message is required");
  }
  return { payload: error };
});

// Экшен для удаления задачи
export const deleteTodo = createAction("DELETE_TODO", (id) => {
  validateId(id);
  return { payload: id };
});

// Экшен для ошибки при удалении задачи
export const deleteTodoError = createAction("DELETE_TODO_ERROR", (error) => {
  if (!error || typeof error !== "string") {
    console.warn("Invalid error message:", error);
    throw new Error("Error message is required");
  }
  return { payload: error };
});

// Экшен для переключения статуса задачи
export const toggleTodo = createAction("TOGGLE_TODO", (id) => {
  validateId(id);
  return { payload: id };
});

// Экшен для редактирования задачи
export const editTodo = createAction("EDIT_TODO", (id, text) => {
  validateId(id);
  validateText(text);
  return { payload: { id, text: text.trim() } };
});

// Экшен для ошибки при редактировании задачи
export const editTodoError = createAction("EDIT_TODO_ERROR", (error) => {
  if (!error || typeof error !== "string") {
    console.warn("Invalid error message:", error);
    throw new Error("Error message is required");
  }
  return { payload: error };
});

// Экшен для очистки завершённых задач
export const clearCompleted = createAction("CLEAR_COMPLETED");

// Экшен для изменения фильтра задач
export const setFilter = createAction("SET_FILTER");
