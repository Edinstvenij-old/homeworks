import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodosRequest,
  clearTodosRequest,
} from "../redux/todos/todosSlice";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10 px-4">
      {loading && (
        <p className="text-center text-lg font-semibold animate-pulse">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {todos.length > 0 ? (
        <div className="flex flex-col w-full max-w-xl gap-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          <button
            onClick={() => dispatch(clearTodosRequest())}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg mt-6 mx-auto transition-all w-full"
          >
            Clear All Todos
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg mt-10">
          No todos yet. Add one! 🚀
        </p>
      )}
    </div>
  );
}
