import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../features/todos/todosActions";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTask = {
      todo: trimmedText,
      completed: false,
    };

    dispatch({ type: ADD_TODO, payload: newTask });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить задачу..."
        style={styles.input}
      />
      <button type="submit" disabled={!text.trim()} style={styles.button}>
        Добавить
      </button>
    </form>
  );
};

// Простенькие inline-стили для наглядности
const styles = {
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    opacity: 1,
  },
};

export default TodoForm;
