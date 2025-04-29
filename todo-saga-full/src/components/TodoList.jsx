import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import {
  FETCH_TODOS,
  clearCompletedRequest,
} from "../features/todos/todosActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, hasMore } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  const handleLoadTodos = () => {
    if (!loading && hasMore) {
      dispatch({ type: FETCH_TODOS });
    }
  };

  const handleClearCompleted = () => {
    dispatch(clearCompletedRequest());
  };

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

  return (
    <div style={styles.container}>
      <div style={styles.buttonsWrapper}>
        <button
          onClick={handleLoadTodos}
          style={styles.button}
          disabled={loading || !hasMore}
        >
          {loading ? "Загрузка..." : "Загрузить ещё"}
        </button>
        <button
          onClick={handleClearCompleted}
          style={{ ...styles.button, backgroundColor: "#f44336" }}
        >
          Очистить выполненные
        </button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <p style={styles.message}>Нет доступных задач.</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};

export default TodoList;
