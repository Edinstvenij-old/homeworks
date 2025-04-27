import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  editTodo,
} from "../redux/actions/todosActions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text || ""); // Защита если текст пустой

  const handleToggle = () => dispatch(toggleTodo(todo.id));
  const handleDelete = () => dispatch(deleteTodo(todo.id));
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      dispatch(editTodo(todo.id, trimmedText));
      setIsEditing(false);
    }
  };

  return (
    <li style={styles.item}>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={handleToggle}
        style={styles.checkbox}
      />
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.editInput}
        />
      ) : (
        <span
          style={{
            ...styles.text,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {typeof todo.text === "string" ? todo.text : "Invalid text"}
        </span>
      )}
      <div style={styles.buttons}>
        {isEditing ? (
          <button style={styles.smallButton} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button style={styles.smallButton} onClick={handleEdit}>
            Edit
          </button>
        )}
        <button style={styles.smallButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  text: {
    flex: "1",
    fontSize: "18px",
    overflowWrap: "break-word",
  },
  editInput: {
    flex: "1",
    padding: "6px",
    fontSize: "16px",
  },
  checkbox: {
    cursor: "pointer",
  },
  buttons: {
    display: "flex",
    gap: "4px",
  },
  smallButton: {
    padding: "4px 8px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default TodoItem;
