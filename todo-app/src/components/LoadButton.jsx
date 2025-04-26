import { useDispatch } from "react-redux";

const LoadButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "FETCH_TODOS" });
  };

  return (
    <button
      onClick={handleClick}
      style={{ marginTop: "20px", padding: "8px 16px", fontSize: "16px" }}
    >
      Завантажити Todos з API
    </button>
  );
};

export default LoadButton;
