import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todosActions";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter a task!");
      return;
    }
    dispatch(addTodo(text.trim()));
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        style={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button style={styles.button} type="submit">
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
  },
  input: { padding: "8px", fontSize: "16px", width: "250px" },
  button: { padding: "8px 16px", fontSize: "16px", cursor: "pointer" },
  error: { color: "red", fontSize: "14px" },
};

export default TodoForm;
