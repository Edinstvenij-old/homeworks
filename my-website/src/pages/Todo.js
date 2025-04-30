import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import TodoList from "../components/TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <TextField
        label="Нова задача"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
      />
      <Button onClick={addTodo} variant="contained" sx={{ marginTop: 2 }}>
        Додати
      </Button>
      <TodoList todos={todos} onDelete={deleteTodo} />
    </Container>
  );
}

export default Todo;
