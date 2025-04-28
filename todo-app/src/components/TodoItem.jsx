import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodoFromAPI,
  toggleTodo,
  editTodoOnAPI,
} from "../redux/actions/todosActions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id)); // Локальное изменение статуса задачи
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (todo.source === "local") {
        // Удаляем локальные задачи
        dispatch(deleteTodoFromAPI(todo.id));
      } else {
        // Для API задач можно вызвать другое действие
        console.warn("Cannot delete API tasks directly.");
        // Если нужно, можно реализовать удаление API задач, например через API запрос
      }
    } catch (error) {
      setError("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setText(todo.text);
    setError(""); // Очищаем ошибки при начале редактирования
  };

  const handleSave = async () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      try {
        setLoading(true);
        if (todo.source === "local") {
          // Редактируем только локальные задачи
          await dispatch(editTodoOnAPI({ id: todo.id, text: trimmedText }));
          setIsEditing(false);
          setError(""); // Очищаем ошибки после успешного сохранения
        } else {
          // Редактирование задач из API, если требуется
          console.warn("Cannot edit API tasks directly.");
          // Можно добавить логику для редактирования API задач
        }
      } catch (err) {
        setError("Failed to save task.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Text cannot be empty!"); // Ошибка, если текст пустой
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // Отмена редактирования
    setText(todo.text); // Возвращаем старый текст
    setError(""); // Очищаем ошибки
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
            autoFocus
          />
          {error && <div style={styles.error}>{error}</div>}
        </>
      ) : (
        <span
          style={{
            ...styles.text,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.text}
        </span>
      )}
      <div style={styles.buttons}>
        {isEditing ? (
          <>
            <button
              style={styles.smallButton}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button style={styles.smallButton} onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              style={styles.smallButton}
              onClick={handleEdit}
              disabled={loading}
            >
              {loading ? "Editing..." : "Edit"}
            </button>
            <button
              style={styles.smallButton}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
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
