import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../features/todos/todosActions";

// Генерация уникального ID для каждой задачи (можно использовать библиотеку, например, uuid)
const generateId = () => Math.random().toString(36).substr(2, 9);

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      const newTask = {
        id: generateId(), // Генерация уникального ID
        todo: text.trim(),
        completed: false,
      };

      // Отправляем действие для добавления задачи
      dispatch({ type: ADD_TODO, payload: newTask });

      setText(""); // Очищаем поле ввода после отправки
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
