import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List (Redux-Saga)</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
