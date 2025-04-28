// Экшены для работы с задачами
export const FETCH_TODOS = "todos/fetchTodos";
export const ADD_TODO = "todos/addTodo";
export const DELETE_TODO = "todos/deleteTodo";
export const TOGGLE_TODO = "todos/toggleTodo";
export const EDIT_TODO = "todos/editTodo";
export const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS";
export const EDIT_TODO_FAILURE = "todos/editTodoFailure";
export const CLEAR_COMPLETED = "todos/clearCompleted";
export const CLEAR_COMPLETED_REQUEST = "todos/clearCompletedRequest"; // Лучше использовать одинаковый стиль именования
export const FETCH_TODOS_FROM_API = "todos/fetchTodosFromApi";
export const FETCH_TODOS_SUCCESS = "todos/fetchTodosSuccess";
export const FETCH_TODOS_FAILURE = "todos/fetchTodosFailure";

// Экшены для локального хранилища
export const SYNC_WITH_LOCAL_STORAGE = "todos/syncWithLocalStorage";
export const CLEAR_LOCAL_STORAGE = "todos/clearLocalStorage";

// Экшен для очистки завершенных задач
export const clearCompletedRequest = () => ({
  type: CLEAR_COMPLETED_REQUEST,
});

// Экшен для обработки ошибок
export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});

// Экшен для установки задач
export const setTodos = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

// Экшен для получения задач с API
export const fetchTodosFromApi = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      ); // Пример API
      const data = await response.json();
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

// Экшен для редактирования задачи
export const editTodo = (updatedTodo) => ({
  type: "todos/editTodo",
  payload: updatedTodo,
});

// Экшен для ошибки редактирования задачи
export const editTodoFailure = (error) => ({
  type: EDIT_TODO_FAILURE,
  payload: error,
});
