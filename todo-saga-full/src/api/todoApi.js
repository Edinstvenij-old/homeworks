import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

// Получение задач с пагинацией
export const getTodos = (page, pageSize) => {
  return axios.get(`${API_URL}?_page=${page}&_limit=${pageSize}`);
};

// Добавление новой задачи
export const addTodo = async (todoData) => {
  try {
    const response = await axios.post(API_URL, todoData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
};

// Удаление задачи по ID
export const deleteTodo = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Переключение состояния задачи (завершена/не завершена)
export const toggleTodo = (id, completed) => {
  return axios.put(`${API_URL}/${id}`, { completed });
};

// Редактирование задачи
export const editTodo = (id, updatedFields) =>
  axios.put(`https://dummyjson.com/todos/${id}`, updatedFields);
