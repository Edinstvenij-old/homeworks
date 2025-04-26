import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  editTodo,
} from "../redux/actions/todosActions";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleTodo(todo.id));
  const handleDelete = () => dispatch(deleteTodo(todo.id));
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    if (text.trim()) {
      dispatch(editTodo(todo.id, text.trim()));
      setIsEditing(false);
    }
  };

  return (
    <li style={styles.item}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {isEditing ? (
        <input
          style={styles.editInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
  },
  editInput: {
    flex: "1",
    padding: "6px",
    fontSize: "16px",
  },
  smallButton: {
    padding: "4px 8px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default TodoItem;
