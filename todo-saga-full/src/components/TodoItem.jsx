import { useDispatch } from "react-redux";
import {
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
} from "../features/todos/todosActions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({
      type: TOGGLE_TODO,
      payload: { id: todo.id, completed: !todo.completed },
    });
  };

  const handleDelete = () => {
    dispatch({ type: DELETE_TODO, payload: todo.id });
  };

  const handleEdit = () => {
    const newTodo = prompt("Edit todo:", todo.todo);
    if (newTodo && newTodo !== todo.todo) {
      dispatch({ type: EDIT_TODO, payload: { id: todo.id, todo: newTodo } });
    }
  };

  return (
    <li>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {typeof todo.todo === "string" ? todo.todo : JSON.stringify(todo.todo)}
      </span>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
