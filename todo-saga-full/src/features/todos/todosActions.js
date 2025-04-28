// Тут описуємо ВСІ екшени для сага
export const FETCH_TODOS = "todos/fetchTodos";
export const ADD_TODO = "todos/addTodo";
export const DELETE_TODO = "todos/deleteTodo";
export const TOGGLE_TODO = "todos/toggleTodo";
export const EDIT_TODO = "todos/editTodo";
export const CLEAR_COMPLETED = "todos/clearCompleted";
export const CLEAR_COMPLETED_REQUEST = "CLEAR_COMPLETED_REQUEST";
export const FETCH_TODOS_FROM_API = "FETCH_TODOS_FROM_API";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
// Экшены для локального хранилища
export const SYNC_WITH_LOCAL_STORAGE = "todos/syncWithLocalStorage";
export const CLEAR_LOCAL_STORAGE = "todos/clearLocalStorage";
export const clearCompletedRequest = () => ({
  type: CLEAR_COMPLETED_REQUEST,
});
export const setError = (error) => ({
  type: "SET_ERROR",
  payload: error,
});
// Экшен для установки задач
export const setTodos = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});
// Экшен для получения задач с сервера
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
