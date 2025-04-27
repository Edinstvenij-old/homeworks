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

    if (!text.trim()) {
      setError("Please enter a task!");
      return;
    }

    try {
      if (typeof text !== "string") {
        setError("The task must be a valid string.");
        return;
      }
      const newTodo = {
        id: uuidv4(),
        text: text.trim(),
        completed: false,
      };

      dispatch(addTodoSuccess(newTodo));

      setText("");
      setError("");
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
