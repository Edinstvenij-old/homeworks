import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoRequest } from "../redux/todos/todosSlice";

export default function TodoForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodoRequest(text.trim()));
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 mt-10 w-full px-4"
    >
      <input
        className="w-full max-w-xl p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-lg"
        type="text"
        placeholder="Enter a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg w-full max-w-xl transition-all"
      >
        Add
      </button>
    </form>
  );
}
