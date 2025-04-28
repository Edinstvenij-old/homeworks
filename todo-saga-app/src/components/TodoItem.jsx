import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodoRequest,
  toggleTodoRequest,
  updateTodoRequest,
} from "../redux/todos/todosSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(todo.todo);

  const handleSave = () => {
    if (text.trim()) {
      dispatch(updateTodoRequest({ id: todo.id, todo: text }));
      setEditMode(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 transition-all shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodoRequest(todo.id))}
          className="w-5 h-5 accent-indigo-500"
        />
        {editMode ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-b focus:outline-none text-lg bg-transparent"
          />
        ) : (
          <span
            className={`text-lg ${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.todo}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => dispatch(deleteTodoRequest(todo.id))}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
