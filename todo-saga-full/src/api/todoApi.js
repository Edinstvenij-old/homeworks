import axios from "axios";

// Используем правильный базовый URL для API
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Добавить задачу
export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo); // Используем полный URL
  return response.data;
};

// Удалить задачу
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`); // Используем полный URL
  return response.data;
};

// Переключить статус задачи
export const toggleTodo = async (id, completed) => {
  const response = await axios.patch(`${API_URL}/${id}`, { completed }); // Используем полный URL
  return response.data;
};

// Редактировать задачу
export const editTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo); // Используем полный URL
  return response.data;
};

// Получить все задачи с пагинацией
export const getTodos = async (page = 1, pageSize = 10) => {
  const response = await axios.get(
    `${API_URL}?_page=${page}&_limit=${pageSize}`
  ); // Используем правильную пагинацию
  return response.data;
};
