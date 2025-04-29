import axios from "axios";

// Базовый URL для API
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Добавить задачу
export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

// Удалить задачу по ID
export const deleteTodo = async (id) => {
  if (!id) throw new Error("ID задачи обязателен для удаления");
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Переключить статус задачи (completed: true/false)
export const toggleTodo = async (id, completed) => {
  if (!id) throw new Error("ID задачи обязателен для изменения статуса");
  const response = await axios.patch(`${API_URL}/${id}`, { completed });
  return response.data;
};

// Редактировать задачу полностью
export const editTodo = async (id, todo) => {
  if (!id || !todo)
    throw new Error("ID и объект задачи обязательны для редактирования");
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

// Получить список задач с пагинацией
export const getTodos = async (page = 1, pageSize = 10) => {
  const response = await axios.get(
    `${API_URL}?_page=${page}&_limit=${pageSize}`
  );
  return response.data;
};
