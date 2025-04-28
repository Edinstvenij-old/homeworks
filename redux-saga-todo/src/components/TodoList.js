import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  removeTodo,
  markTodoComplete,
  clearCompletedTodos,
} from "../features/todo/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos()); // Загружаем todo при монтировании компонента
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeTodo(id)); // Удалить задачу
  };

  const handleComplete = (id) => {
    dispatch(markTodoComplete(id)); // Отметить задачу как выполненную
  };

  const handleClearCompleted = () => {
    dispatch(clearCompletedTodos()); // Очистить выполненные задачи
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="todo-list-container">
      <button className="clear-btn" onClick={handleClearCompleted}>
        Clear Completed
      </button>
      <ul className="todo-list">
        {todos.length === 0 ? (
          <li>No tasks available</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleComplete}
              onComplete={handleComplete}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
