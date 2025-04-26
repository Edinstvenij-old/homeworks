import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import LoadButton from "./components/LoadButton";
import { FETCH_TODOS } from "./redux/actions/todosActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <TodoForm />
      <TodoFilters />
      <TodoList />
      <LoadButton />
    </div>
  );
}

export default App;
