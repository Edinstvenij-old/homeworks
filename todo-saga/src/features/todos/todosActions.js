// Типы экшенов
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

export const SET_ERROR = "todos/setError";
export const SET_TODOS = "todos/setTodos";

// Универсальный хелпер
const createAction = (type, payload = null) => ({
  type,
  ...(payload !== null && { payload }),
});

// Экшены получения задач
export const fetchTodos = () => createAction(FETCH_TODOS);
export const fetchTodosSuccess = (todos) =>
  createAction(FETCH_TODOS_SUCCESS, todos);
export const fetchTodosFailure = (error) =>
  createAction(FETCH_TODOS_FAILURE, error);

// Экшены добавления задачи
export const addTodoRequest = (todo) => createAction(ADD_TODO, todo);
export const addTodoSuccess = (todo) => createAction(ADD_TODO_SUCCESS, todo);
export const addTodoFailure = (error) => createAction(ADD_TODO_FAILURE, error);

// Экшены удаления задачи
export const deleteTodoRequest = (id) => createAction(DELETE_TODO, id);
export const deleteTodoSuccess = (id) => createAction(DELETE_TODO_SUCCESS, id);
export const deleteTodoFailure = (error) =>
  createAction(DELETE_TODO_FAILURE, error);

// Экшены переключения задачи
export const toggleTodoRequest = (id) => createAction(TOGGLE_TODO, id);
export const toggleTodoSuccess = (updatedTodo) =>
  createAction(TOGGLE_TODO_SUCCESS, updatedTodo);
export const toggleTodoFailure = (error) =>
  createAction(TOGGLE_TODO_FAILURE, error);

// Экшены редактирования задачи
export const editTodoRequest = (todo) => createAction(EDIT_TODO, todo);
export const editTodoSuccess = (updatedTodo) =>
  createAction(EDIT_TODO_SUCCESS, updatedTodo);
export const editTodoFailure = (error) =>
  createAction(EDIT_TODO_FAILURE, error);

// Очистка завершённых задач
export const clearCompletedRequest = () =>
  createAction(CLEAR_COMPLETED_REQUEST);
export const clearCompletedSuccess = () =>
  createAction(CLEAR_COMPLETED_SUCCESS);
export const clearCompletedFailure = (error) =>
  createAction(CLEAR_COMPLETED_FAILURE, error);

// Синхронизация с localStorage
export const syncWithLocalStorage = (todos) =>
  createAction(SYNC_WITH_LOCAL_STORAGE, todos);
export const clearLocalStorage = () => createAction(CLEAR_LOCAL_STORAGE);

// Установка ошибок и задач вручную
export const setError = (error) => createAction(SET_ERROR, error);
export const setTodos = (todos) => createAction(SET_TODOS, todos);
