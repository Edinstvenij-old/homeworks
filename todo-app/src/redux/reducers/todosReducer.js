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
    if (todos) {
      const parsedTodos = JSON.parse(todos);
      if (Array.isArray(parsedTodos)) {
        return parsedTodos;
      } else {
        console.warn("Loaded data is not an array. Returning empty list.");
        return [];
      }
    }
    return [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

const initialState = {
  items: loadFromLocalStorage(),
  filter: "all",
};

const checkDuplicateIds = (todos) => {
  const ids = todos.map((todo) => todo.id);
  return new Set(ids).size !== ids.length;
};

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
      console.log("Dispatching todo:", action.payload);

      if (state.items.some((todo) => todo.id === action.payload.id)) {
        console.warn(`Задача с id ${action.payload.id} уже существует!`);
        return;
      }

      if (
        typeof action.payload.text !== "string" ||
        action.payload.text.trim() === ""
      ) {
        console.warn(`Невалидный текст задачи: ${action.payload.text}`);
        return;
      }

      const newTodo = { ...action.payload, source: "local" };
      state.items.push(newTodo);
      saveToLocalStorage(state.items);
    })

    .addCase(deleteTodo, (state, action) => {
      const todoId = action.payload;
      const todoToDelete = state.items.find((todo) => todo.id === todoId);

      if (todoToDelete?.source === "local") {
        state.items = state.items.filter((todo) => todo.id !== todoId);
        saveToLocalStorage(state.items);
      } else {
        console.warn("Задача с этим id не является локальной.");
      }
    })

    .addCase(toggleTodo, (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo && todo.source === "local") {
        todo.completed = !todo.completed;
        saveToLocalStorage(state.items);
      } else {
        console.warn(
          `Задача с id ${action.payload} не найдена для переключения статуса или она не является локальной.`
        );
      }
    })

    .addCase(editTodo, (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo && todo.source === "local") {
        const newText = action.payload.text.trim();

        if (typeof newText !== "string" || newText === "") {
          console.warn(`Невалидный текст задачи: ${newText}`);
          return;
        }

        todo.text = newText;
        saveToLocalStorage(state.items);
      } else {
        console.warn(
          `Задача с id ${action.payload.id} не найдена для редактирования или она не является локальной.`
        );
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
