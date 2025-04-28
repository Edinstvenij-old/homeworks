import { createSelector } from "reselect";

// Селектор для получения всех задач
const getTodos = (state) => state.todos?.items || [];  // Добавляем проверку на undefined

// Селектор для получения фильтра
const getFilter = (state) => state.todos?.filter || "всі";  // Используем дефолтное значение "всі"

// Мемоизированный селектор для фильтрации задач
export const getFilteredTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case "всі":
        return todos;
      case "активні":
        return todos.filter((todo) => !todo.completed);
      case "завершені":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
);
