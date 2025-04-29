import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
} from "../features/todos/todosActions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title || "");

  const isLocalTask = typeof todo.id !== "number" || todo.id > 200;

  const handleToggle = async () => {
    const updatedTask = { ...todo, completed: !todo.completed };

    if (isLocalTask) {
      dispatch({ type: TOGGLE_TODO, payload: updatedTask });
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) throw new Error("Ошибка при обновлении задачи");
      const data = await response.json();
      dispatch({ type: TOGGLE_TODO, payload: data });
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const handleEdit = async () => {
    if (newTitle.trim() === "") return;

    const updatedTask = { ...todo, title: newTitle.trim() };

    if (isLocalTask) {
      dispatch({ type: EDIT_TODO, payload: updatedTask });
      setIsEditing(false);
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) throw new Error("Ошибка при редактировании задачи");
      const data = await response.json();
      dispatch({ type: EDIT_TODO, payload: data });
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
    }
  };

  const handleDelete = () => dispatch({ type: DELETE_TODO, payload: todo.id });

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewTitle(todo.title);
  };

  return (
    <li style={styles.item}>
      <div style={styles.left}>
        <input
          type="checkbox"
          checked={todo.completed || false}
          onChange={handleToggle}
          style={styles.checkbox}
        />
        {!isEditing ? (
          <span
            style={{
              ...styles.text,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "#333",
            }}
          >
            {todo.title || <em>Без названия</em>}
          </span>
        ) : (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
            autoFocus
          />
        )}
      </div>
      <div style={styles.buttons}>
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              style={{ ...styles.button, backgroundColor: "#4CAF50" }}
            >
              Сохранить
            </button>
            <button
              onClick={handleCancelEdit}
              style={{
                ...styles.button,
                backgroundColor: "#e0e0e0",
                color: "#333",
              }}
            >
              Отмена
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{ ...styles.button, backgroundColor: "#2196F3" }}
            >
              Редактировать
            </button>
            <button
              onClick={handleDelete}
              style={{ ...styles.button, backgroundColor: "#f44336" }}
            >
              Удалить
            </button>
          </>
        )}
      </div>
    </li>
  );
};

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "12px 16px",
    marginBottom: "10px",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  left: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "10px",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    transition: "transform 0.2s ease",
  },
  text: {
    fontSize: "16px",
    wordBreak: "break-word",
    maxWidth: "100%",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  },
  input: {
    fontSize: "16px",
    padding: "5px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    flex: 1,
  },
  buttons: {
    display: "flex",
    gap: "8px",
    marginLeft: "10px",
  },
  button: {
    padding: "6px 12px",
    fontSize: "14px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.2s ease",
  },
};

export default TodoItem;
