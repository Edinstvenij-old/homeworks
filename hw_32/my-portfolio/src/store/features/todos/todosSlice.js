import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadInitialTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  items: loadInitialTodos(),
  editId: null,
  editText: "",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: uuidv4(),
        text: action.payload.text,
        date: action.payload.date,
        done: false,
      };
      state.items.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.items));
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.items));
    },
    toggleDone: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
        localStorage.setItem("todos", JSON.stringify(state.items));
      }
    },
    startEdit: (state, action) => {
      state.editId = action.payload.id;
      state.editText = action.payload.text;
    },
    saveEdit: (state, action) => {
      const { id } = action.payload;
      const todo = state.items.find((todo) => todo.id === id);
      if (todo) {
        todo.text = state.editText;
        localStorage.setItem("todos", JSON.stringify(state.items));
      }
      state.editId = null;
      state.editText = "";
    },
    setEditText: (state, action) => {
      state.editText = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleDone,
  startEdit,
  saveEdit,
  setEditText,
} = todosSlice.actions;

export default todosSlice.reducer;
