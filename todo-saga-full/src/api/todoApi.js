import axios from "axios";

// Базовый URL для API
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Добавить задачу
export const addTodo = async (todo) => {
  try {
    if (!todo || !todo.title) {
      throw new Error("Необходимо указать название задачи");
    }

    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при добавлении задачи:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Удалить задачу по ID
export const deleteTodo = async (id) => {
  if (!id) throw new Error("ID задачи обязателен для удаления");

  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при удалении задачи:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Переключить статус задачи (completed: true/false)
export const toggleTodo = async (id, completed) => {
  if (!id) throw new Error("ID задачи обязателен для изменения статуса");

  try {
    const response = await axios.patch(`${API_URL}/${id}`, { completed });
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при изменении статуса задачи:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Редактировать задачу
export const editTodo = async (id, todo) => {
  if (!id || !todo) {
    console.error("Ошибка: ID и объект задачи обязательны для редактирования");
    throw new Error("ID и объект задачи обязательны для редактирования");
  }

  try {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    console.log("Ответ от сервера при редактировании:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Ошибка при редактировании задачи:", error.response.data);
    } else {
      console.error("Ошибка при редактировании задачи:", error.message);
    }
    throw error;
  }
};

// Получить список задач с пагинацией
export const getTodos = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}?_page=${page}&_limit=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении списка задач:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
