import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "todos";

// Загрузка всех задач из localStorage
const loadAll = () => {
  try {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // Проверяем, если данные некорректные, возвращаем пустой массив
    if (!Array.isArray(todos)) {
      console.warn("localStorage contains invalid data, resetting...");
      return [];
    }
    return todos;
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

// Сохранение задач в localStorage
const saveAll = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
};

export const addLocalTodo = (text) => {
  if (!text.trim()) {
    console.warn("Cannot add an empty task.");
    return null; // Возвращаем null, если текст пустой
  }

  const todos = loadAll();
  const newTodo = {
    id: uuidv4(), // Генерация уникального ID
    text: text.trim(), // Применение trim для удаления лишних пробелов
    completed: false,
    source: "local",
  };
  todos.push(newTodo);
  saveAll(todos);
  return newTodo;
};

export const deleteLocalTodo = (id) => {
  const todos = loadAll();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveAll(updatedTodos);
  return id;
};

export const toggleLocalTodo = (id) => {
  const todos = loadAll();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveAll(updatedTodos);
  return updatedTodos.find((todo) => todo.id === id);
};

export const editLocalTodo = (id, text) => {
  if (!text.trim()) {
    console.warn("Cannot edit task with an empty text.");
    return null; // Возвращаем null, если текст пустой
  }

  const todos = loadAll();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, text: text.trim() } : todo
  );
  saveAll(updatedTodos);
  return updatedTodos.find((todo) => todo.id === id);
};

export const clearCompletedLocalTodos = () => {
  const todos = loadAll();
  const activeTodos = todos.filter((todo) => !todo.completed);
  saveAll(activeTodos);
  return activeTodos;
};

export const getLocalTodos = loadAll;
