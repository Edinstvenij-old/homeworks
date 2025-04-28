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

  const handleLoadTodos = () => {
    dispatch({ type: FETCH_TODOS });
  };

  const handleClearCompleted = () => {
    dispatch(clearCompletedRequest());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleLoadTodos}>Load More Todos</button>
        <button onClick={handleClearCompleted} style={{ marginLeft: "10px" }}>
          Clear Completed
        </button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {tasks.map((todo, index) => (
            <TodoItem key={`${todo.id}-${index}`} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
