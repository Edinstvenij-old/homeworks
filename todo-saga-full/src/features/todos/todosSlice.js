import { createSlice } from "@reduxjs/toolkit";

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
      const storedTasks = getStoredTasks();
      storedTasks.push(newTask);
      saveTasksToLocalStorage(storedTasks);
      state.tasks.push(newTask);
    },
    updateTask(state, action) {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        const storedTasks = getStoredTasks();
        const updatedStoredTasks = storedTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        saveTasksToLocalStorage(updatedStoredTasks);
      }
    },
    toggleTodoSuccess(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.completed = action.payload.completed;
        const storedTasks = getStoredTasks();
        const updatedStoredTasks = storedTasks.map((t) =>
          t.id === task.id
            ? { ...task, completed: action.payload.completed }
            : t
        );
        saveTasksToLocalStorage(updatedStoredTasks);
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
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      const storedTasks = getStoredTasks();
      const updatedStoredTasks = storedTasks.filter(
        (task) => task.id !== taskId
      );
      saveTasksToLocalStorage(updatedStoredTasks);
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
      const storedTasks = getStoredTasks();
      const updatedStoredTasks = storedTasks.filter((task) => !task.completed);
      saveTasksToLocalStorage(updatedStoredTasks);
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
      state.error = action.payload || "Ошибка при редактировании задачи";
    },
    clearCompletedRequest(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
  },
});

const getStoredTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasksToLocalStorage = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

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
  editTodoFailure,
  clearCompletedRequest,
} = todosSlice.actions;

export default todosSlice.reducer;
