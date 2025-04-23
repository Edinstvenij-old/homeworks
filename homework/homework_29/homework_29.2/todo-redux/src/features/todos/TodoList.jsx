import { useSelector } from "react-redux";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">Немає завдань</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="bg-gray-100 p-3 rounded hover:bg-gray-200 transition-colors"
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
