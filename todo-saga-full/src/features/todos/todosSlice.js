import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskToLocalStorage,
  updateTaskInLocalStorage,
  deleteTaskFromLocalStorage,
} from "../../utils/localStorageUtils";

// Начальное состояние
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
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
    addTask(state, action) {
      const newTask = action.payload;
      addTaskToLocalStorage(newTask);
      state.tasks.push(newTask);
    },
    updateTask(state, action) {
      const updatedTask = action.payload;
      updateTaskInLocalStorage(updatedTask);
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    toggleTodoSuccess(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
      }
    },
    incrementPage(state) {
      state.page += 1;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      deleteTaskFromLocalStorage(taskId);
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addTodoSuccess(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTodoSuccess(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTodoSuccess(state, action) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    editTodoFailure(state, action) {
      // 🔥 добавили обработку ошибки редактирования
      state.error = action.payload || "Ошибка при редактировании задачи";
    },
    clearCompletedRequest(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
  },
});

export const {
  setTasks,
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  deleteTodoSuccess,
  toggleTodoSuccess,
  incrementPage,
  setPageSize,
  addTask,
  updateTask,
  deleteTask,
  clearCompleted,
  setError,
  editTodoSuccess,
  editTodoFailure, // 🔥 обязательно экспортировать
  clearCompletedRequest,
} = todosSlice.actions;

export default todosSlice.reducer;
