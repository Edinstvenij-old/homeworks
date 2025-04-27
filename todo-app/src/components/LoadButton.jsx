import { useDispatch } from "react-redux";

const FETCH_TODOS = "FETCH_TODOS";

const LoadButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: FETCH_TODOS });
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
