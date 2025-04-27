import axios from "axios";

const BASE_URL = "https://dummyjson.com/todos";

// --- Отримуємо todos ---
export const fetchTodos = async () => {
  try {
    const response = await axios.get(BASE_URL);
    if (!response.data.todos) {
      throw new Error("No todos found");
    }
    return response.data.todos.map((todo) => ({
      id: todo.id,
      text: todo.todo,
      completed: todo.completed,
    }));
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    throw error;
  }
};

// --- Додаємо нове todo ---
export const addTodo = async (text) => {
  try {
    const response = await axios.post(BASE_URL, {
      todo: text,
      completed: false,
      userId: 5,
    });
    return {
      id: response.data.id,
      text: response.data.todo,
      completed: response.data.completed,
    };
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw error;
  }
};

// --- Видаляємо todo по id ---
export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw error;
  }
};

// --- Змінюємо статус completed ---
export const toggleTodo = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}`);
    if (!data) {
      throw new Error("Todo not found");
    }
    const response = await axios.put(`${BASE_URL}/${id}`, {
      completed: !data.completed,
    });
    return {
      id: response.data.id,
      completed: response.data.completed,
    };
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    throw error;
  }
};

// --- Редагуємо текст todo ---
export const editTodo = async (id, text) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, {
      todo: text,
    });
    return {
      id: response.data.id,
      text: response.data.todo,
      completed: response.data.completed,
    };
  } catch (error) {
    console.error("Failed to edit todo:", error);
    throw error;
  }
};

// --- Очищуємо завершені todos ---
export const clearCompleted = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    if (!data.todos) {
      throw new Error("No todos found");
    }
    const completedTodos = data.todos.filter((t) => t.completed);
    for (const todo of completedTodos) {
      await axios.delete(`${BASE_URL}/${todo.id}`);
    }
  } catch (error) {
    console.error("Failed to clear completed todos:", error);
    throw error;
  }
};
