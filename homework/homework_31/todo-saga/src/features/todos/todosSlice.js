import { createSlice } from "@reduxjs/toolkit";

// === Utils for LocalStorage ===
const getStoredTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasksToLocalStorage = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

// === Initial State ===
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
};

// === Slice ===
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Загрузка задач
    fetchTodosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTodosFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Установка задач напрямую
    setTasks(state, action) {
      state.tasks = action.payload;
    },

    // Добавление задачи
    addTask(state, action) {
      const newTask = action.payload;
      const stored = getStoredTasks();
      const updated = [...stored, newTask];
      saveTasksToLocalStorage(updated);
      state.tasks.push(newTask);
    },
    addTodoSuccess(state, action) {
      state.tasks.push(action.payload);
    },

    // Обновление задачи
    updateTask(state, action) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        const stored = getStoredTasks();
        const updated = stored.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        saveTasksToLocalStorage(updated);
      }
    },
    editTodoSuccess(state, action) {
      const updated = action.payload;
      const index = state.tasks.findIndex((t) => t.id === updated.id);
      if (index !== -1) {
        state.tasks[index] = updated;
      }
    },
    editTodoFailure(state, action) {
      state.error = action.payload || "Ошибка при редактировании задачи";
    },

    // Удаление задачи
    deleteTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((t) => t.id !== id);
      const stored = getStoredTasks();
      const updated = stored.filter((t) => t.id !== id);
      saveTasksToLocalStorage(updated);
    },
    deleteTodoSuccess(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },

    // Переключение статуса задачи
    toggleTodoSuccess(state, action) {
      const { id, completed } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.completed = completed;
        const stored = getStoredTasks();
        const updated = stored.map((t) =>
          t.id === id ? { ...t, completed } : t
        );
        saveTasksToLocalStorage(updated);
      }
    },

    // Очистка завершенных задач
    clearCompleted(state) {
      state.tasks = state.tasks.filter((t) => !t.completed);
      const stored = getStoredTasks();
      const updated = stored.filter((t) => !t.completed);
      saveTasksToLocalStorage(updated);
    },
    clearCompletedRequest(state) {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },

    // Пагинация
    incrementPage(state) {
      state.page += 1;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },

    // Установка ошибки
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// === Export ===
export const {
  setTasks,
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTask,
  updateTask,
  deleteTask,
  clearCompleted,
  toggleTodoSuccess,
  incrementPage,
  setPageSize,
  setError,
  addTodoSuccess,
  deleteTodoSuccess,
  editTodoSuccess,
  editTodoFailure,
  clearCompletedRequest,
} = todosSlice.actions;

export default todosSlice.reducer;
