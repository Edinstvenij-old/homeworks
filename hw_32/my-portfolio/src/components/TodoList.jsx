import {
  List,
  ListItem,
  Checkbox,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useRef, useEffect } from "react";

const TodoList = ({
  todos,
  toggleDone,
  deleteTodo,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    }
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#f9f9f9",
            mb: 1,
            borderRadius: 1,
            px: 1,
          }}
        >
          <Checkbox checked={todo.done} onChange={() => toggleDone(todo.id)} />

          {editId === todo.id ? (
            <TextField
              inputRef={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, todo.id)}
              size="small"
              sx={{ flexGrow: 1, mr: 1 }}
            />
          ) : (
            <Typography
              sx={{
                textDecoration: todo.done ? "line-through" : "none",
                flexGrow: 1,
                mr: 1,
              }}
            >
              {todo.text}
            </Typography>
          )}

          {editId === todo.id ? (
            <IconButton onClick={() => saveEdit(todo.id)} color="primary">
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => startEdit({ id: todo.id, text: todo.text })}
              color="info"
            >
              <EditIcon />
            </IconButton>
          )}

          <IconButton onClick={() => deleteTodo(todo.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
