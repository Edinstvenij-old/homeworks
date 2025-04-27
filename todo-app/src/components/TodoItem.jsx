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
  const [error, setError] = useState(""); // Для отображения ошибки, если текст некорректный

  const handleToggle = () => dispatch(toggleTodo(todo.id));
  const handleDelete = () => dispatch(deleteTodo(todo.id));
  const handleEdit = () => {
    setIsEditing(true);
    setText(todo.text); // Сохраняем текущий текст при редактировании
  };

  const handleSave = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      dispatch(editTodo(todo.id, trimmedText));
      setIsEditing(false);
      setError(""); // Сбросить ошибку при успешном сохранении
    } else {
      setError("Text cannot be empty!"); // Сообщение об ошибке, если текст пуст
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
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.editInput}
          />
          {error && <div style={styles.error}>{error}</div>}{" "}
          {/* Показать ошибку, если есть */}
        </>
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
        <button
          style={styles.smallButton}
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
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
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default TodoItem;
