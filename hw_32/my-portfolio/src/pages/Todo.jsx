import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import TodoList from "../components/TodoList";
import TodoCalendar from "../components/TodoCalendar";

const formatDate = (date) => (date ? format(date, "yyyy-MM-dd") : null);

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const saveTodos = (updated) => {
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  const addTodo = () => {
    if (text.trim()) {
      const newTodo = {
        id: uuidv4(),
        text: text.trim(),
        done: false,
        date: formatDate(selectedDate),
      };
      saveTodos([...todos, newTodo]);
      setText("");
    }
  };

  const deleteTodo = (id) => {
    saveTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id) => {
    saveTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    saveTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditId(null);
    setEditText("");
  };

  const selectedFormatted = formatDate(selectedDate);
  const filteredTodos = todos.filter((todo) => todo.date === selectedFormatted);

  const todosByDate = todos.reduce((acc, todo) => {
    acc[todo.date] = (acc[todo.date] || 0) + 1;
    return acc;
  }, {});

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
          Задачи по дате
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TodoCalendar
            value={selectedDate}
            onChange={setSelectedDate}
            todosByDate={todosByDate}
          />
        </LocalizationProvider>

        <Typography variant="body2" sx={{ mb: 1 }}>
          {filteredTodos.length
            ? `Задач на ${selectedFormatted}: ${filteredTodos.length}`
            : `На ${selectedFormatted} нет задач.`}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, my: 2 }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Новая задача"
            fullWidth
            size="small"
          />
          <Button onClick={addTodo} variant="contained">
            Добавить
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <TodoList
          todos={filteredTodos}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
          startEdit={startEdit}
          saveEdit={saveEdit}
        />
      </Paper>
    </Container>
  );
};

export default Todo;
