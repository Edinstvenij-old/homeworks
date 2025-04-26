// Action Types
export const LOAD_TODOS = "LOAD_TODOS";
export const SET_TODOS = "SET_TODOS";
export const FETCH_TODOS = "FETCH_TODOS";
export const SET_FILTER = "SET_FILTER";

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";

export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";

// Action Creators
export const loadTodos = () => ({ type: LOAD_TODOS });
export const setTodos = (todos) => ({ type: SET_TODOS, payload: todos });

export const fetchTodos = () => ({ type: FETCH_TODOS });

export const addTodo = (text) => ({ type: ADD_TODO, payload: text });
export const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: todo,
});

export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: { id, text },
});
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });

// Фільтрація
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
