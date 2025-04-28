import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

// Получение задач с пагинацией
export const getTodos = (page, pageSize) => {
  return axios.get(`${API_URL}?_page=${page}&_limit=${pageSize}`);
};

// Добавление новой задачи
export const addTodo = (todo) =>
  axios.post(API_URL, {
    todo,
    completed: false,
    userId: 1,
  });

// Удаление задачи по ID
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

// Переключение состояния задачи (завершена/не завершена)
export const toggleTodo = (id, completed) =>
  axios.put(`${API_URL}/${id}`, { completed });

// Редактирование задачи
export const editTodo = (id, todo) => axios.put(`${API_URL}/${id}`, { todo });
