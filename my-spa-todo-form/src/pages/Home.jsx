import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useTodoForm } from "../hooks/useTodoForm";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const { darkMode } = useTheme();

  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addTodo = (data) => {
    const newTodo = {
      id: Date.now(),
      text: data.task.trim(),
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const { register, handleSubmit, errors } = useTodoForm(addTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className={`todo ${darkMode ? "dark" : "light"}`}>
      <h1>Список справ</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          {...register("task")}
          placeholder="Нове завдання..."
          className={`todo-input ${errors.task ? "input-error" : ""}`}
        />
        <button type="submit" className="add">
          Додати
        </button>

        <AnimatePresence>
          {errors.task && (
            <motion.p
              className="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {errors.task.message}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      {/* Список задач */}
      <ul className="todo-list">
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
              darkMode={darkMode}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
