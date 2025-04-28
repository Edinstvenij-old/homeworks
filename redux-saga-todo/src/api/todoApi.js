import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

// Завантажити 10 todos
export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        limit: 10, // Ограничиваем количество задач до 10
        skip: 0, // Пропускаем 0 задач, начиная с первого
      },
    });
    if (response.data && Array.isArray(response.data.todos)) {
      return response.data.todos; // Повертаємо список todos
    }
    throw new Error("No todos found or data is in an unexpected format");
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Error fetching todos: " + error.message);
  }
};

// Додати нове todo
export const addTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Повертаємо нове додане todo
    } else {
      throw new Error("Failed to add todo");
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    throw new Error("Error adding todo: " + error.message);
  }
};

// Видалити todo за ID
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Повертаємо відповідь про видалення
    } else {
      throw new Error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Error deleting todo: " + error.message);
  }
};

// Оновити todo за ID
export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Failed to update todo");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    throw new Error("Error updating todo: " + error.message);
  }
};

// Відмітити todo як виконане
export const markTodoComplete = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { completed: true });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("Failed to mark todo complete");
    }
  } catch (error) {
    console.error("Error marking todo complete:", error);
    throw new Error("Error marking todo complete: " + error.message);
  }
};

// Очищення виконаних todos
export const clearCompletedTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    const completedTodos = response.data.todos?.filter(
      (todo) => todo.completed
    );

    if (completedTodos && completedTodos.length > 0) {
      // Можна запустити всі запити на видалення паралельно
      const deleteRequests = completedTodos.map((todo) =>
        axios.delete(`${API_URL}/${todo.id}`)
      );
      await Promise.all(deleteRequests); // Чекаємо, поки всі запити на видалення завершаться
    }
  } catch (error) {
    console.error("Error clearing completed todos:", error);
    throw new Error("Error clearing completed todos: " + error.message);
  }
};
