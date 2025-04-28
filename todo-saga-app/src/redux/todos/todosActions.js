export const fetchTodos = () => ({ type: "FETCH_TODOS" });
export const addTodo = (todo) => ({ type: "ADD_TODO", payload: todo });
export const deleteTodo = (id) => ({ type: "DELETE_TODO", payload: id });
export const toggleTodo = (todo) => ({ type: "TOGGLE_TODO", payload: todo });
export const updateTodo = (todo) => ({ type: "UPDATE_TODO", payload: todo });
export const clearTodos = () => ({ type: "CLEAR_TODOS" });
