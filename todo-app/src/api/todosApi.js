import axios from "axios";

const BASE_URL = "https://dummyjson.com/todos";

// --- Отримуємо todos ---
export const fetchTodos = async () => {
  try {
    const response = await axios.get(BASE_URL);
    // Проверка на успешный ответ и данные
    if (
      response.status !== 200 ||
      !response.data ||
      !Array.isArray(response.data.todos)
    ) {
      throw new Error("No valid todos data found");
    }
    // Логируем для проверки ответа
    console.log("Fetched todos:", response.data);
    return response.data.todos.map((todo) => ({
      id: todo.id,
      text: todo.todo,
      completed: todo.completed,
    }));
  } catch (error) {
    console.error(
      "Failed to fetch todos:",
      error.response?.data || error.message || error
    );
    throw error.response?.data || error.message || "Unknown error";
  }
};

// --- Додаємо нове todo ---
export const addTodo = async (text) => {
  try {
    const response = await axios.post(BASE_URL, {
      todo: text,
      completed: false,
      userId: 5, // Убедитесь, что userId действительно нужен
    });
    if (response.status !== 200) {
      throw new Error("Failed to add todo");
    }
    return {
      id: response.data.id,
      text: response.data.todo,
      completed: response.data.completed,
    };
  } catch (error) {
    console.error(
      "Failed to add todo:",
      error.response?.data || error.message || error
    );
    throw error.response?.data || error.message || "Unknown error";
  }
};

// --- Видаляємо todo по id ---
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete todo");
    }
    return id;
  } catch (error) {
    console.error(
      "Failed to delete todo:",
      error.response?.data || error.message || error
    );
    throw error.response?.data || error.message || "Unknown error";
  }
};

// --- Змінюємо статус completed ---
export const toggleTodo = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    if (!data || !data.id) {
      throw new Error("Todo not found");
    }
    const response = await axios.put(`${BASE_URL}/${id}`, {
      completed: !data.completed,
    });
    if (response.status !== 200) {
      throw new Error("Failed to toggle todo");
    }
    return {
      id: response.data.id,
      completed: response.data.completed,
    };
  } catch (error) {
    console.error(
      "Failed to toggle todo:",
      error.response?.data || error.message || error
    );
    throw error.response?.data || error.message || "Unknown error";
  }
};

// --- Редагуємо текст todo ---
export const editTodo = async (id, text) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      todo: text,
    });
    if (response.status !== 200) {
      throw new Error("Failed to edit todo");
    }
    return {
      id: response.data.id,
      text: response.data.todo,
      completed: response.data.completed,
    };
  } catch (error) {
    console.error(
      "Failed to edit todo:",
      error.response?.data || error.message || error
    );
    throw error.response?.data || error.message || "Unknown error";
  }
};

// --- Очищуємо завершені todos ---
export const clearCompleted = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    if (!data || !Array.isArray(data.todos)) {
      throw new Error("No todos found");
    }
    const completedTodos = data.todos.filter((t) => t.completed);
    const deletePromises = completedTodos.map((todo) =>
      axios.delete(`${BASE_URL}/${todo.id}`)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error(
      "Failed to clear completed todos:",
      error.response?.data || error.message || error
    );
    throw error.response?.data || error.message || "Unknown error";
  }
};
