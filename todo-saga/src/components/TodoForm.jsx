import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../features/todos/todosActions";

let nextId = 101;

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) return;

    if (nextId > 200) nextId = 1;

    dispatch({
      type: ADD_TODO,
      payload: {
        id: nextId++,
        title: trimmedText,
        completed: false,
      },
    });

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
      <button
        type="submit"
        disabled={!text.trim()}
        style={{
          ...styles.button,
          backgroundColor: text.trim() ? "#4CAF50" : "#9CCC9C",
          cursor: text.trim() ? "pointer" : "not-allowed",
        }}
      >
        Добавить
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    outline: "none",
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
};

export default TodoForm;
