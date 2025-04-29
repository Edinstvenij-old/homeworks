import { useDispatch } from "react-redux";
import axios from "axios";
import {
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  EDIT_TODO_FAILURE,
  EDIT_TODO_SUCCESS, // Новый экшен для успешного редактирования
} from "../features/todos/todosActions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  console.log("TodoItem props:", todo);

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
    const newTodo = prompt("Изменить задачу:", todo.title);

    if (newTodo && newTodo.trim() !== "" && newTodo !== todo.title) {
      const updatedTodo = { id: todo.id, title: newTodo.trim() };
      dispatch({
        type: EDIT_TODO,
        payload: updatedTodo,
      });

      console.log("Отправка данных на сервер:", updatedTodo);

      // Отправка данных на сервер
      axios
        .put(
          `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
          updatedTodo
        )
        .then((response) => {
          if (response.status === 200 && response.data) {
            console.log("Задача обновлена:", response.data);
            // Успешно обновлена на сервере
            dispatch({
              type: EDIT_TODO_SUCCESS,
              payload: response.data, // Обновление задачи с сервером
            });
          } else {
            console.error("Ошибка на сервере:", response);
            // Обработка ошибки сервера
            dispatch({
              type: EDIT_TODO_FAILURE,
              payload: { id: todo.id, error: "Ошибка на сервере" },
            });
          }
        })
        .catch((error) => {
          console.error("Ошибка при обновлении задачи:", error);
          // Обработаем ошибку при запросе
          dispatch({
            type: EDIT_TODO_FAILURE,
            payload: { id: todo.id, error: error.message },
          });
        });
    } else {
      console.log("Редактирование отменено или не изменилось");
    }
  };

  return (
    <li style={styles.item}>
      <div style={styles.left}>
        <input
          type="checkbox"
          checked={todo.completed || false}
          onChange={handleToggle}
          style={styles.checkbox}
        />
        <span
          style={{
            ...styles.text,
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#999" : "#333",
          }}
        >
          {todo.title || "Без названия"}
        </span>
      </div>
      <div style={styles.buttons}>
        <button
          onClick={handleEdit}
          style={{ ...styles.button, backgroundColor: "#2196f3" }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          style={{ ...styles.button, backgroundColor: "#f44336" }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
    width: "18px",
    height: "18px",
  },
  text: {
    fontSize: "16px",
    wordBreak: "break-word",
  },
  buttons: {
    display: "flex",
    gap: "8px",
  },
  button: {
    padding: "6px 12px",
    fontSize: "14px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TodoItem;
