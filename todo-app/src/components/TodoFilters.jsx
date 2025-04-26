import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/actions/todosActions";

const TodoFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.todos.filter);

  const changeFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div style={styles.container}>
      {["всі", "активні", "завершені"].map((f) => (
        <button
          key={f}
          onClick={() => changeFilter(f)}
          style={{
            ...styles.button,
            backgroundColor: currentFilter === f ? "#4caf50" : "#f0f0f0",
            color: currentFilter === f ? "#fff" : "#000",
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    margin: "16px 0",
  },
  button: {
    padding: "8px 16px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
};

export default TodoFilters;
