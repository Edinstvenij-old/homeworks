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

    if (nextId > 200) {
      nextId = 1;
    }

    const newTask = {
      id: nextId++,
      title: trimmedText,
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
      <button
        type="submit"
        disabled={!text.trim()}
        style={{
          ...styles.button,
          opacity: text.trim() ? 1 : 0.6,
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
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    transition: "opacity 0.2s ease",
  },
};

export default TodoForm;
