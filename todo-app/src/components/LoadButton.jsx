import { useDispatch } from "react-redux";
import { fetchTodosFromAPI } from "../redux/actions/todosActions"; // Предполагается, что fetchTodosFromAPI уже определён

const LoadButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // Запускаем асинхронный экшен для загрузки задач из API
    dispatch(fetchTodosFromAPI());
  };

  return (
    <button onClick={handleClick} style={styles.button}>
      Завантажити Todos з API
    </button>
  );
};

const styles = {
  button: {
    marginTop: "20px",
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

export default LoadButton;
