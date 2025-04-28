import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List (Redux-Saga)</h1>
      <ErrorBoundary>
        <TodoForm />
        <TodoList />
      </ErrorBoundary>
    </div>
  );
}

export default App;
