import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoSuccess } from "../redux/actions/todosActions";
import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на пустоту и некорректный ввод
    if (!text.trim()) {
      setError("Please enter a task!");
      return;
    }

    try {
      // Убедимся, что передаем строку, а не объект
      if (typeof text !== "string") {
        setError("The task must be a valid string.");
        return;
      }

      // Генерируем уникальный ID для задачи
      const newTodo = {
        id: uuidv4(), // Генерируем уникальный id
        text: text.trim(),
        completed: false, // Задача по умолчанию не выполнена
      };

      // Отправляем задачу в Redux
      dispatch(addTodoSuccess(newTodo)); // Передаем объект с id и текстом задачи

      setText(""); // Очистить поле ввода
      setError(""); // Сбросить ошибку
    } catch (err) {
      console.error("Error while adding todo:", err);
      setError("There was an error while adding your task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Додати
      </button>
      {error && <div style={styles.error}>{error}</div>}
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "250px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default TodoForm;
