import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введіть нове завдання..."
        className="flex-1 p-4 text-lg border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm h-14"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all shadow-md h-14"
      >
        Додати
      </button>
    </form>
  );
};

export default TodoForm;
