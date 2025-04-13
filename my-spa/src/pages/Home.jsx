import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { darkMode } = useTheme();
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmed = task.trim();
    if (trimmed) {
      setTodos((prev) => [...prev, { id: Date.now(), text: trimmed }]);
      setTask("");
    }
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className={`todo ${darkMode ? "dark" : "light"}`}>
      <h1>Список справ</h1>

      <div className="todo-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Нове завдання..."
        />
        <button className="add" onClick={addTodo}>
          Додати
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${darkMode ? "dark" : "light"}`}
          >
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
