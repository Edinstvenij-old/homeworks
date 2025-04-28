import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/actions/todosActions";

const TodoFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.todos?.filter || "all"); // защита от undefined

  const changeFilter = (filter) => {
    dispatch(setFilter(filter)); // Устанавливаем новый фильтр
  };

  return (
    <div style={styles.container}>
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => changeFilter(f)}
          style={{
            ...styles.button,
            backgroundColor: currentFilter === f ? "#4caf50" : "#f0f0f0", // Зеленый для активного фильтра
            color: currentFilter === f ? "#fff" : "#000", // Белый текст для активного
            boxShadow:
              currentFilter === f ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none", // Тень для активного
            fontWeight: currentFilter === f ? "bold" : "normal", // Утолщение шрифта для активного фильтра
          }}
        >
          {f === "all" ? "Всі" : f === "active" ? "Активні" : "Завершені"}
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
    borderRadius: "4px",
    textTransform: "capitalize",
    outline: "none",
  },
};

export default TodoFilters;
