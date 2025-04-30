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

const TodoList = ({
  todos,
  toggleDone,
  deleteTodo,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
}) => (
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
        }}
      >
        <Checkbox checked={todo.done} onChange={() => toggleDone(todo.id)} />
        {editId === todo.id ? (
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
        {editId === todo.id ? (
          <IconButton onClick={() => saveEdit(todo.id)} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => startEdit(todo.id, todo.text)}
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

export default TodoList;
