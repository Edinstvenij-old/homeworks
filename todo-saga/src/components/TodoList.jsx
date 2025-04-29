import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import {
  FETCH_TODOS,
  clearCompletedRequest,
} from "../features/todos/todosActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  const handleClearCompleted = () => {
    dispatch(clearCompletedRequest());
  };

  const renderContent = () => {
    if (loading && (!tasks || tasks.length === 0)) {
      return <p style={styles.message}>Загрузка...</p>;
    }

    if (error) {
      return (
        <p style={{ ...styles.message, color: "red" }}>
          Ошибка: {error?.message || "Неизвестная ошибка"}
        </p>
      );
    }

    if (!tasks || tasks.length === 0) {
      return <p style={styles.message}>Нет доступных задач.</p>;
    }

    return (
      <ul style={styles.list}>
        {tasks.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Список задач</h2>
        <button
          onClick={handleClearCompleted}
          style={{ ...styles.button, backgroundColor: "#e53935" }}
        >
          Очистить выполненные
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

const styles = {
  container: {
    margin: "40px auto",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "800px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  button: {
    padding: "10px 16px",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  buttonHovered: {
    backgroundColor: "#388E3C",
    transform: "scale(1.05)",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
    marginTop: "40px",
  },
};

export default TodoList;
