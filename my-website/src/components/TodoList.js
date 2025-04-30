import React from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

function TodoList({ todos, onDelete }) {
  return (
    <List>
      {todos.map((todo, index) => (
        <ListItem
          key={index}
          secondaryAction={
            <Button onClick={() => onDelete(index)} color="secondary">
              Удалить
            </Button>
          }
        >
          <ListItemText primary={todo} />
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
