import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import {
  FETCH_TODOS,
  CLEAR_COMPLETED,
  CLEAR_COMPLETED_REQUEST,
} from "../features/todos/todosActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => dispatch({ type: CLEAR_COMPLETED_REQUEST })}>
        Clear Completed
      </button>
    </div>
  );
};

export default TodoList;
