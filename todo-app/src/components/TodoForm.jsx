import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addLocalTodo } from "../redux/services/localStorageService"; // Используем сервис для работы с localStorage

const TodoForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a task!");
      return;
    }

    const newTodo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
      source: "local",
    };

    try {
      // Диспатчим только локальное добавление в Redux store и localStorage
      dispatch(addLocalTodo(newTodo)); // Обновляем Redux состояние
    } catch (err) {
      console.error("Failed to add todo to Redux or localStorage:", err);
      setError("Failed to add todo.");
    }

    // Очищаем форму
    setText("");
    setError("");
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
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
