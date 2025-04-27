import { createReducer } from "@reduxjs/toolkit";
import {
  setTodos,
  addTodoSuccess,
  deleteTodo,
  toggleTodo,
  editTodo,
  clearCompleted,
  setFilter,
} from "../actions/todosActions";

// --- Сервисы LocalStorage ---
const saveToLocalStorage = (items) => {
  try {
    if (Array.isArray(items) && items.length > 0) {
      localStorage.setItem("todos", JSON.stringify(items));
    } else {
      localStorage.removeItem("todos");
    }
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

// --- Начальный стейт ---
const initialState = {
  items: loadFromLocalStorage(),
  filter: "all",
};

// --- Проверка на дубли ID ---
const checkDuplicateIds = (todos) => {
  const ids = todos.map((todo) => todo.id);
  return new Set(ids).size !== ids.length;
};

// --- Новый todosReducer ---
const todosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTodos, (state, action) => {
      if (checkDuplicateIds(action.payload)) {
        console.warn(
          "Найдены дублирующиеся ID задач! Данные не будут сохранены."
        );
        return;
      }
      state.items = action.payload;
      saveToLocalStorage(state.items);
    })

    .addCase(addTodoSuccess, (state, action) => {
      if (state.items.some((todo) => todo.id === action.payload.id)) {
        console.warn(`Задача с id ${action.payload.id} уже существует!`);
        return;
      }
      state.items = [...state.items, action.payload]; // Используем spread для добавления нового todo
      saveToLocalStorage(state.items);
    })

    .addCase(deleteTodo, (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(state.items);
    })

    .addCase(toggleTodo, (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state.items);
      }
    })

    .addCase(editTodo, (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text.trim();
        saveToLocalStorage(state.items);
      }
    })

    .addCase(clearCompleted, (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
      saveToLocalStorage(state.items);
    })

    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    });
});

export default todosReducer;
