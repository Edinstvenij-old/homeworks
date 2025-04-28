import React from "react";
import { markTodoComplete, deleteTodo } from "../api/todoApi";

const TodoItem = ({ todo, onComplete, onDelete }) => {
  const handleComplete = async () => {
    try {
      await markTodoComplete(todo.id);
      onComplete(todo.id); // Обновляем состояние в родительском компоненте
    } catch (error) {
      console.error("Error marking todo complete:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      onDelete(todo.id); // Обновляем состояние в родительском компоненте
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {/* Используем правильное поле для отображения текста */}
      <span>{todo.title || todo.text}</span>  {/* Проверьте правильное имя поля */}

      <div className="buttons">
        <button
          className="complete-btn"
          onClick={handleComplete}
          disabled={todo.completed} // Деактивируем кнопку, если задача выполнена
        >
          {todo.completed ? "Completed" : "Complete"}
        </button>
        
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
