// Экшены для работы с задачами
export const FETCH_TODOS = "todos/fetchTodos";
export const FETCH_TODOS_SUCCESS = "todos/fetchTodosSuccess";
export const FETCH_TODOS_FAILURE = "todos/fetchTodosFailure";

export const ADD_TODO = "todos/addTodo";
export const ADD_TODO_SUCCESS = "todos/addTodoSuccess";
export const ADD_TODO_FAILURE = "todos/addTodoFailure";

export const DELETE_TODO = "todos/deleteTodo";
export const DELETE_TODO_SUCCESS = "todos/deleteTodoSuccess";
export const DELETE_TODO_FAILURE = "todos/deleteTodoFailure";

export const TOGGLE_TODO = "todos/toggleTodo";
export const TOGGLE_TODO_SUCCESS = "todos/toggleTodoSuccess";
export const TOGGLE_TODO_FAILURE = "todos/toggleTodoFailure";

export const EDIT_TODO = "todos/editTodo";
export const EDIT_TODO_SUCCESS = "todos/editTodoSuccess";
export const EDIT_TODO_FAILURE = "todos/editTodoFailure";

export const CLEAR_COMPLETED = "todos/clearCompleted";
export const CLEAR_COMPLETED_REQUEST = "todos/clearCompletedRequest";
export const CLEAR_COMPLETED_SUCCESS = "todos/clearCompletedSuccess";
export const CLEAR_COMPLETED_FAILURE = "todos/clearCompletedFailure";

export const SYNC_WITH_LOCAL_STORAGE = "todos/syncWithLocalStorage";
export const CLEAR_LOCAL_STORAGE = "todos/clearLocalStorage";

// Простые action creators:

// Экшен для успешной очистки завершенных задач
export const clearCompletedSuccess = () => ({
  type: CLEAR_COMPLETED_SUCCESS,
});

// Экшен для ошибки очистки завершенных задач
export const clearCompletedFailure = (error) => ({
  type: CLEAR_COMPLETED_FAILURE,
  payload: error,
});

// Экшен для запроса на очистку завершенных задач
export const clearCompletedRequest = () => ({
  type: CLEAR_COMPLETED_REQUEST,
});

// Экшен для установки ошибки
export const setError = (error) => ({
  type: "todos/setError",
  payload: error,
});

// Экшен для установки задач
export const setTodos = (todos) => ({
  type: "todos/setTodos",
  payload: todos,
});

// Экшен для редактирования задачи
export const editTodo = (updatedTodo) => ({
  type: EDIT_TODO,
  payload: updatedTodo,
});

// Экшен для ошибки редактирования задачи
export const editTodoFailure = (error) => ({
  type: EDIT_TODO_FAILURE,
  payload: error,
});
