import axios from "axios";

const BASE_URL = "https://dummyjson.com/todos";

// Отримати список todos
export const getTodosApi = async () => {
  const response = await axios.get(`${BASE_URL}?limit=10`);
  return response.data.todos;
};

// Додати новий todo
export const addTodoApi = async (todoText) => {
  const response = await axios.post(`${BASE_URL}/add`, {
    todo: todoText,
    completed: false,
    userId: 1,
  });
  return response.data; // Повертаємо новий todo
};

// Видалити todo
export const deleteTodoApi = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id; // Повертаємо id для оновлення стану
};

// Переключити виконання todo
export const toggleTodoApi = async (todo) => {
  const response = await axios.put(`${BASE_URL}/${todo.id}`, {
    completed: !todo.completed,
  });
  return response.data; // Повертаємо оновлений todo
};

// Оновити текст todo
export const updateTodoApi = async (todo) => {
  const response = await axios.put(`${BASE_URL}/${todo.id}`, {
    todo: todo.todo,
  });
  return response.data; // Повертаємо оновлений todo
};
