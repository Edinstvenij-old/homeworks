import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const getTodos = () => axios.get(API_URL);
export const addTodo = (todo) =>
  axios.post(`${API_URL}/add`, {
    todo,
    completed: false,
    userId: 1,
  });
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const toggleTodo = (id, completed) =>
  axios.put(`${API_URL}/${id}`, { completed });
export const editTodo = (id, todo) => axios.put(`${API_URL}/${id}`, { todo });
