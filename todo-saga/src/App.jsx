import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List (Redux-Saga)</h1>
      <ErrorBoundary>
        <TodoForm />
        <TodoList />
      </ErrorBoundary>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "50px auto",
    transition: "all 0.3s ease",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: "30px",
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
    transform: "scale(1.05)",
  },
};

export default App;
