import { memo } from "react";
import { motion } from "framer-motion";

function TodoItem({ todo, onToggle, onDelete, darkMode }) {
  const handleToggle = () => onToggle(todo.id);
  const handleDelete = () => onDelete(todo.id);

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      layout
      className={`todo-item ${darkMode ? "dark" : "light"}`}
    >
      <span
        onClick={handleToggle}
        className={`todo-text ${todo.completed ? "completed" : ""}`}
      >
        {todo.text}
      </span>
      <button className="delete" onClick={handleDelete}>
        Видалити
      </button>
    </motion.li>
  );
}

export default memo(TodoItem);
