import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Collapse,
  TextField,
  Button,
  Divider,
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
  cancelEdit,
} from "../store/features/todos/todosSlice";
import TodoList from "../components/TodoList";
import TodoCalendar from "../components/TodoCalendar";

const formatDate = (date) => (date ? format(date, "yyyy-MM-dd") : "");

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const editId = useSelector((state) => state.todos.editId);
  const editText = useSelector((state) => state.todos.editText);

  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showWarning, setShowWarning] = useState(false);
  const [flash, setFlash] = useState(false);

  const selectedFormatted = formatDate(selectedDate);

  const filteredTodos = useMemo(
    () => todos.filter((todo) => todo.date === selectedFormatted),
    [todos, selectedFormatted]
  );

  const todosByDate = useMemo(
    () =>
      todos.reduce((acc, todo) => {
        acc[todo.date] = (acc[todo.date] || 0) + 1;
        return acc;
      }, {}),
    [todos]
  );

  const playSound = () => {
    const audio = new Audio("/sounds/ding.mp3");
    audio.play();
  };

  const playBroomSound = () => {
    const audio = new Audio("/sounds/broom.mp3");
    audio.play();
  };

  const playStrikeSound = () => {
    const audio = new Audio("/sounds/strike.mp3");
    audio.play();
  };

  const handleAdd = () => {
    const trimmed = text.trim();
    if (trimmed) {
      dispatch(addTodo({ text: trimmed, date: selectedFormatted }));
      setText("");
      setShowWarning(false);
      playSound();
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
    } else {
      setShowWarning(true);
    }
  };

  const handleEditTextChange = (newText) => {
    dispatch(setEditText(newText));
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(saveEdit({ id: editId, text: editText }));
    }
  };

  const handleCancelEdit = () => {
    dispatch(cancelEdit());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleToggleDone = (id) => {
    dispatch(toggleDone(id));
    playStrikeSound();
  };

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  useEffect(() => {
    if (text.trim()) {
      setShowWarning(false);
    }
  }, [text]);

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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Новая задача"
              fullWidth
              size="small"
              aria-label="Новое задание"
              onKeyDown={handleKeyPress}
              data-testid="new-task-input"
              sx={{
                transition: "box-shadow 0.3s",
                boxShadow: flash ? "0 0 0 3px rgba(25, 118, 210, 0.5)" : "none",
              }}
            />
            <Button
              onClick={handleAdd}
              variant="contained"
              role="button"
              aria-label="Добавить задачу"
              data-testid="add-task-button"
            >
              Добавить
            </Button>
          </Box>

          {showWarning && (
            <Collapse in={showWarning}>
              <Alert
                severity="warning"
                sx={{ width: "100%", mt: 1 }}
                onClose={() => setShowWarning(false)}
              >
                Пожалуйста, введите задачу!
              </Alert>
            </Collapse>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <TodoList
          todos={filteredTodos}
          toggleDone={handleToggleDone}
          deleteTodo={(id) => {
            dispatch(deleteTodo(id));
            playBroomSound();
          }}
          editId={editId}
          editText={editText}
          setEditText={handleEditTextChange}
          startEdit={(id) => dispatch(startEdit(id))}
          saveEdit={handleSaveEdit}
          cancelEdit={handleCancelEdit}
        />
      </Paper>
    </Container>
  );
};

export default Todo;
