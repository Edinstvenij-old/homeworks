import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCompleted, setTodos } from "../redux/actions/todosActions";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.todos.filter);

  // Загружаем todos из localStorage при первом рендере компонента
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const savedTodos = JSON.parse(saved);
        if (Array.isArray(savedTodos)) {
          dispatch(setTodos(savedTodos)); // Устанавливаем todos в Redux
        }
      } catch (error) {
        console.error("Error loading todos from localStorage:", error);
      }
    } else {
      dispatch(setTodos([])); // Если нет todos в localStorage, ставим пустой массив
    }
  }, [dispatch]);

  // Убедимся, что todos всегда массив
  const safeTodos = Array.isArray(todos) ? todos : [];

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos = safeTodos.filter((todo) => {
    switch (filter) {
      case "всі":
        return true; // Все задачи
      case "активні":
        return !todo.completed; // Только не завершенные
      case "завершені":
        return todo.completed; // Только завершенные
      default:
        return true;
    }
  });

  // Очистка всех задач из localStorage и сброс в Redux
  const clearAllTodos = () => {
    localStorage.removeItem("todos"); // Удаляем todos из localStorage
    dispatch(setTodos([])); // Очищаем все todos в Redux
  };

  // Показуємо повідомлення, якщо todos пустий
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
