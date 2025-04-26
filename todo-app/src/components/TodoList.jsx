import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCompleted, setTodos } from "../redux/actions/todosActions";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.todos.filter);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const savedTodos = JSON.parse(saved);
        if (Array.isArray(savedTodos)) {
          dispatch(setTodos(savedTodos));
        }
      } catch (error) {
        console.error("Error loading todos from localStorage:", error);
      }
    } else {
      dispatch(setTodos([]));
    }
  }, [dispatch]);

  const safeTodos = Array.isArray(todos) ? todos : [];

  const filteredTodos = safeTodos.filter((todo) => {
    switch (filter) {
      case "всі":
        return true;
      case "активні":
        return !todo.completed;
      case "завершені":
        return todo.completed;
      default:
        return true;
    }
  });

  const clearAllTodos = () => {
    localStorage.removeItem("todos");
    dispatch(setTodos([]));
  };

  if (filteredTodos.length === 0) {
    return <div>No todos available</div>;
  }

  return (
    <div>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <button onClick={() => dispatch(clearCompleted())}>
        Очистити Завершені
      </button>
      <button onClick={clearAllTodos}>Очистити ВСІ задачі</button>
    </div>
  );
};

export default TodoList;
