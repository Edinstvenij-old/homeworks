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
  console.log("Adding todo with text:", text); // Логирование перед выполнением экшена

  if (typeof text !== "string") {
    console.warn("Text is not a string:", text);
    throw new Error("Text must be a string");
  }

  const id = uuidv4(); // Генерация уникального идентификатора
  return { payload: { id, text: text.trim(), completed: false } }; // Возвращаем объект с id, text и completed
});

// Экшен для успешного добавления задачи
export const addTodoSuccess = createAction("ADD_TODO_SUCCESS", (todo) => {
  if (!todo || !todo.id || !todo.text) {
    console.warn("Invalid todo data:", todo); // Добавим логирование для диагностики
    throw new Error("Invalid todo data");
  }
  return { payload: todo }; // Возвращаем задачу с id, text и completed
});

// Экшен для ошибки при добавлении задачи
export const addTodoError = createAction("ADD_TODO_ERROR", (error) => {
  if (!error || typeof error !== "string") {
    console.warn("Invalid error message:", error); // Логируем ошибку
    throw new Error("Error message is required");
  }
  return { payload: error }; // Передаем ошибку в экшен
});

// Экшен для удаления задачи
export const deleteTodo = createAction("DELETE_TODO", (id) => {
  validateId(id); // Проверка id
  return { payload: id }; // Возвращаем ID задачи для удаления
});

// Экшен для ошибки при удалении задачи
export const deleteTodoError = createAction("DELETE_TODO_ERROR", (error) => {
  if (!error || typeof error !== "string") {
    console.warn("Invalid error message:", error); // Логируем ошибку
    throw new Error("Error message is required");
  }
  return { payload: error }; // Передаем ошибку при удалении
});

// Экшен для переключения статуса задачи
export const toggleTodo = createAction("TOGGLE_TODO", (id) => {
  validateId(id); // Проверка id
  return { payload: id }; // Возвращаем ID задачи для переключения статуса
});

// Экшен для редактирования задачи
export const editTodo = createAction("EDIT_TODO", (id, text) => {
  validateId(id); // Проверка id
  validateText(text); // Проверка текста
  return { payload: { id, text: text.trim() } }; // Возвращаем объект с id и новым текстом
});

// Экшен для ошибки при редактировании задачи
export const editTodoError = createAction("EDIT_TODO_ERROR", (error) => {
  if (!error || typeof error !== "string") {
    console.warn("Invalid error message:", error); // Логируем ошибку
    throw new Error("Error message is required");
  }
  return { payload: error }; // Передаем ошибку при редактировании
});

// Экшен для очистки завершённых задач
export const clearCompleted = createAction("CLEAR_COMPLETED");

// Экшен для изменения фильтра задач
export const setFilter = createAction("SET_FILTER");
