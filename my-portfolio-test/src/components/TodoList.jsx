import React, { useEffect, useRef } from "react";
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
import CloseIcon from "@mui/icons-material/Close";

const TodoList = ({
  todos,
  toggleDone,
  deleteTodo,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  cancelEdit,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editId) {
      inputRef.current?.focus();
    }
  }, [editId]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && editText.trim() !== "") {
      saveEdit();
    } else if (e.key === "Escape" && cancelEdit) {
      cancelEdit();
    }
  };

  return (
    <List>
      {todos.map((todo) => {
        const isEditing = editId === todo.id;

        const renderEditButtons = (
          <>
            <IconButton
              onClick={() => {
                if (editText.trim() !== "") {
                  saveEdit();
                }
              }}
              color="primary"
              aria-label="сохранить"
              role="button"
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={() => cancelEdit && cancelEdit()}
              color="secondary"
              aria-label="отмена"
              role="button"
            >
              <CloseIcon />
            </IconButton>
          </>
        );

        const renderEditIcon = (
          <IconButton
            onClick={() => startEdit({ id: todo.id, text: todo.text })}
            color="info"
            aria-label="редактировать"
            role="button"
          >
            <EditIcon />
          </IconButton>
        );

        return (
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
            <Checkbox
              checked={todo.done}
              onChange={() => toggleDone(todo.id)}
              inputProps={{ "aria-label": "переключить задачу" }}
            />

            {isEditing ? (
              <TextField
                inputRef={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                size="small"
                sx={{ flexGrow: 1, mr: 1 }}
                inputProps={{ "aria-label": "редактировать задачу" }}
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

            {isEditing ? renderEditButtons : renderEditIcon}

            <IconButton
              onClick={() => deleteTodo(todo.id)}
              color="error"
              aria-label="удалить"
              role="button"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TodoList;
