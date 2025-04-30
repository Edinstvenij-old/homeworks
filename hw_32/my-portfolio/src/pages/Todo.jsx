import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleDone,
  startEdit,
  saveEdit,
  setEditText,
} from "../store/features/todos/todosSlice";
import TodoList from "../components/TodoList";
import TodoCalendar from "../components/TodoCalendar";

const formatDate = (date) => (date ? format(date, "yyyy-MM-dd") : null);

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const editId = useSelector((state) => state.todos.editId);
  const editText = useSelector((state) => state.todos.editText);

  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openSnackbar, setOpenSnackbar] = useState(false); // Для Snackbar

  const selectedFormatted = formatDate(selectedDate);
  const filteredTodos = todos.filter((todo) => todo.date === selectedFormatted);

  const todosByDate = todos.reduce((acc, todo) => {
    acc[todo.date] = (acc[todo.date] || 0) + 1;
    return acc;
  }, {});

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo({ text: text.trim(), date: formatDate(selectedDate) }));
      setText("");
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <Button onClick={handleAdd} variant="contained">
            Добавить
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <TodoList
          todos={filteredTodos}
          toggleDone={(id) => dispatch(toggleDone(id))}
          deleteTodo={(id) => dispatch(deleteTodo(id))}
          editId={editId}
          editText={editText}
          setEditText={(text) => dispatch(setEditText(text))}
          startEdit={(id, text) => dispatch(startEdit({ id, text }))}
          saveEdit={(id) => dispatch(saveEdit(id))}
        />
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Пожалуйста, введите задачу!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Todo;
