import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCompleted,
  setTodos,
  fetchTodosFromAPI,
} from "../redux/actions/todosActions";
import { getFilteredTodos } from "../redux/selectors/selectors";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();

  // Защищаем доступ к state.todos
  const todos = useSelector((state) => {
    const todosState = state.todos || {}; // Если state.todos не существует, создаём пустой объект
    return [
      ...(todosState.local || []), // Если local не существует, создаём пустой массив
      ...(todosState.server || []), // Если server не существует, создаём пустой массив
    ];
  });

  const filter = useSelector((state) => state.todos?.filter || "all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setError(""); // Сброс ошибок перед загрузкой данных
        setLoading(true);

        // Загружаем локальные задачи
        let localTodos = [];
        const saved = localStorage.getItem("todos");

        if (saved) {
          try {
            const savedTodos = JSON.parse(saved);
            if (Array.isArray(savedTodos)) {
              localTodos = savedTodos.filter((todo) => todo.source === "local");
            } else {
              console.warn("Invalid data in localStorage, clearing tasks.");
              localStorage.removeItem("todos");
            }
          } catch (err) {
            console.error("Error parsing localStorage data:", err);
            localStorage.removeItem("todos");
          }
        }

        // Загружаем серверные задачи
        await dispatch(fetchTodosFromAPI());

        // Добавляем локальные задачи в стейт, если они есть
        if (localTodos.length > 0) {
          dispatch(setTodos(localTodos));
        }
      } catch (err) {
        console.error("Error loading todos:", err);
        setError("Error loading tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  // Обновляем localStorage только для локальных задач
  useEffect(() => {
    const localTodos = todos.filter((todo) => todo.source === "local");
    if (localTodos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(localTodos));
    } else {
      localStorage.removeItem("todos");
    }
  }, [todos]);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredTodos = getFilteredTodos(todos, filter);

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
        <button
          style={styles.button}
          onClick={() => {
            dispatch(setTodos([])); // Очищаем все задачи в Redux
            localStorage.removeItem("todos"); // Удаляем все задачи из localStorage
          }}
        >
          Очистити ВСІ задачі
        </button>
      </div>
    </div>
  );
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
