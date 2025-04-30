import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Paper,
  Typography,
  Box,
  Checkbox,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Загрузка задач из localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Сохранение задач в localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (text.trim()) {
      const newTodo = { text, done: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setText(""); // Очистить поле ввода
    }
  };

  const deleteTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, text: editText } : todo
      )
    );
    setEditIndex(null);
    setEditText(""); // Очистить поле редактирования
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Список задач
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Нова задача"
            fullWidth
            size="small"
          />
          <Button onClick={addTodo} variant="contained" sx={{ height: "100%" }}>
            Додати
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <List>
          {todos.map((todo, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#f9f9f9",
                mb: 1,
                borderRadius: 1,
              }}
            >
              <Checkbox
                checked={todo.done}
                onChange={() => toggleDone(index)}
                sx={{ marginRight: 2 }}
              />
              {editIndex === index ? (
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  size="small"
                  sx={{ flexGrow: 1, mr: 1 }}
                />
              ) : (
                <Typography
                  sx={{
                    textDecoration: todo.done ? "line-through" : "none",
                    flexGrow: 1,
                  }}
                >
                  {todo.text}
                </Typography>
              )}
              {editIndex === index ? (
                <IconButton onClick={() => saveEdit(index)} color="primary">
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => startEdit(index)} color="info">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton onClick={() => deleteTodo(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Todo;
