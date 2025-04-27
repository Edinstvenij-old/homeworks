import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todosActions";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
    if (error) setError(""); // Очищаємо помилку під час введення тексту
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a task!");
      return;
    }

    dispatch(addTodo(text.trim()));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
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
