import { useDispatch } from "react-redux";
import axios from "axios"; // Убедитесь, что axios импортирован
import {
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
} from "../features/todos/todosActions";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  console.log("TodoItem props:", todo); // Добавляем лог для дебага

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
    if (newTodo && newTodo.trim() && newTodo !== todo.title) {
      const payload = { id: todo.id, title: newTodo.trim() };
      console.log("Отправка данных на сервер:", payload);

      // Отправка данных на сервер
      axios
        .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, payload)
        .then((response) => {
          if (response && response.data) {
            // Ответ от сервера содержит обновленные данные
            console.log("Задача обновлена:", response.data);

            // Обновление состояния в Redux
            dispatch({
              type: EDIT_TODO,
              payload: { id: todo.id, title: response.data.title }, // Используем данные из ответа сервера
            });
          }
        })
        .catch((error) => {
          console.error("Ошибка при обновлении задачи:", error);
        });
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
          {todo.title || "Без названия"} {/* Проверка, что title передается */}
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
