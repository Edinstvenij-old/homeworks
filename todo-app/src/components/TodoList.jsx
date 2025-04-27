import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCompleted, setTodos } from "../redux/actions/todosActions";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.todos.filter);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) {
        const savedTodos = JSON.parse(saved);

        if (Array.isArray(savedTodos)) {
          if (!hasDuplicateIds(savedTodos)) {
            dispatch(setTodos(savedTodos));
          } else {
            console.warn("Дублікати ID знайдено! Очищаю задачі.");
            dispatch(setTodos([]));
            localStorage.removeItem("todos");
          }
        }
      } else {
        dispatch(setTodos([]));
      }
    } catch (error) {
      console.error("Помилка при завантаженні задач з localStorage:", error);
      dispatch(setTodos([]));
    }
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(todos) && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  const filteredTodos = getFilteredTodos(todos, filter);

  const clearAllTodos = () => {
    dispatch(setTodos([]));
    localStorage.removeItem("todos");
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
      <div style={styles.buttons}>
        <button
          style={styles.button}
          onClick={() => dispatch(clearCompleted())}
        >
          Очистити Завершені
        </button>
        <button style={styles.button} onClick={clearAllTodos}>
          Очистити ВСІ задачі
        </button>
      </div>
    </div>
  );
};

const hasDuplicateIds = (todos) => {
  const ids = todos.map((todo) => todo.id);
  return new Set(ids).size !== ids.length;
};

const getFilteredTodos = (todos = [], filter = "всі") => {
  return todos.filter((todo) => {
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
};

const styles = {
  buttons: {
    marginTop: "16px",
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  button: {
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
  },
};

export default TodoList;
