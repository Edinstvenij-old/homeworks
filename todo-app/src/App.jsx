import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import LoadButton from "./components/LoadButton";
import { fetchTodosFromAPI } from "./redux/actions/todosActions"; // Убираем неиспользуемый импорт
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Для обработки ошибок

  // Загрузка задач с серверов
  useEffect(() => {
    const loadTodos = async () => {
      try {
        await dispatch(fetchTodosFromAPI()); // Асинхронный вызов экшна
        setLoading(false); // Убираем индикатор загрузки после выполнения
      } catch (err) {
        setError(err.message); // Устанавливаем ошибку
        setLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  // Если идет загрузка
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если произошла ошибка
  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <ErrorBoundary>
        <TodoForm />
        <TodoFilters />
        <TodoList />
        <LoadButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;
