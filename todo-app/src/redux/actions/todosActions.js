import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// --- Универсальные функции для проверки данных ---
const validateText = (text) => {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Text is invalid or empty");
  }
};

const validateId = (id) => {
  if (!(typeof id === "number" || typeof id === "string")) {
    throw new Error("Valid ID is required");
  }
};

// --- Стандартные экшены ---
export const loadTodos = createAction("todos/loadTodos");
export const setTodos = createAction("todos/setTodos");
export const setFilter = createAction("todos/setFilter");
export const clearCompleted = createAction("todos/clearCompleted");
export const deleteTodo = createAction("todos/deleteTodo");
export const toggleTodo = createAction("todos/toggleTodo");
export const editTodo = createAction("todos/editTodo");

// --- Статусы операций ---
export const addTodoSuccess = createAction("todos/addTodoSuccess");
export const editTodoSuccess = createAction("todos/editTodoSuccess");
export const deleteTodoSuccess = createAction("todos/deleteTodoSuccess");
export const toggleTodoSuccess = createAction("todos/toggleTodoSuccess");
export const addTodoError = createAction("todos/addTodoError");
export const deleteTodoError = createAction("todos/deleteTodoError");
export const clearCompletedSuccess = createAction(
  "todos/clearCompletedSuccess"
);

// --- Локальные экшены ---
export const addTodoLocal = createAction("todos/addTodoLocal", (text) => {
  validateText(text);
  return {
    payload: {
      id: uuidv4(), // Генерация уникального ID для локальной задачи
      text: text.trim(),
      completed: false,
      source: "local", // Источник задачи: "local"
    },
  };
});

export const deleteTodoLocal = createAction("todos/deleteTodoLocal", (id) => {
  validateId(id);
  return { payload: id };
});

export const toggleTodoLocal = createAction("todos/toggleTodoLocal", (id) => {
  validateId(id);
  return { payload: id };
});

export const editTodoLocal = createAction("todos/editTodoLocal", (id, text) => {
  validateId(id);
  validateText(text);
  return { payload: { id, text: text.trim() } };
});

export const clearCompletedLocal = createAction("todos/clearCompletedLocal");

// --- Асинхронные экшены (thunks) ---
// --- Получение задач с API ---
export const fetchTodosFromAPI = createAsyncThunk(
  "todos/fetchTodosFromAPI",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message); // Возвращаем сообщение об ошибке
    }
  }
);

// --- Добавление задачи на API ---
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (text, { rejectWithValue }) => {
    try {
      validateText(text);
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      return await response.json(); // Возвращаем данные с добавленной задачей
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);

// --- Удаление задачи с API ---
export const deleteTodoFromAPI = createAsyncThunk(
  "todos/deleteTodoFromAPI",
  async (id, { rejectWithValue }) => {
    try {
      validateId(id);
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete todo");
      return id; // Возвращаем ID удаленной задачи
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);

// --- Редактирование задачи на API ---
export const editTodoOnAPI = createAsyncThunk(
  "todos/editTodoOnAPI",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      validateId(id);
      validateText(text);
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      return await response.json(); // Возвращаем обновленные данные задачи
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);
