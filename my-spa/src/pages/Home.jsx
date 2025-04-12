import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // Импортируем хук для доступа к контексту

export default function Home() {
  const { darkMode } = useTheme(); // Получаем текущую тему из контекста
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task }]);
      setTask("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={`todo ${darkMode ? "dark" : "light"}`}>
      {" "}
      {/* Применяем класс в зависимости от темы */}
      <h1>Список справ</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Нове завдання..."
      />
      <button className="add" onClick={addTodo}>
        Додати
      </button>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${darkMode ? "dark" : "light"}`}
          >
            {" "}
            {/* Применяем тему для каждой задачи */}
            <span>{todo.text}</span>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
