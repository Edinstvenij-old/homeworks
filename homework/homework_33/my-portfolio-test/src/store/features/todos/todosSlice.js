import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Загрузка задач из localStorage
const loadInitialTodos = () => {
  const saved = localStorage.getItem("todos");
  try {
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Ошибка при загрузке задач из localStorage", e);
    return [];
  }
};

// Функция для обновления localStorage
const saveTodosToLocalStorage = (todos) => {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    console.error("Ошибка при сохранении задач в localStorage", e);
  }
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
    // Добавление новой задачи
    addTodo: (state, action) => {
      const newTodo = {
        id: uuidv4(),
        text: action.payload.text,
        date: action.payload.date,
        done: false,
      };
      state.items.push(newTodo);
      saveTodosToLocalStorage(state.items); // Обновляем localStorage
    },

    // Удаление задачи
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.items); // Обновляем localStorage
    },

    // Переключение состояния "выполнено"
    toggleDone: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
        saveTodosToLocalStorage(state.items); // Обновляем localStorage
      }
    },

    // Начало редактирования задачи
    startEdit: (state, action) => {
      state.editId = action.payload.id;
      state.editText = action.payload.text;
    },

    // Сохранение отредактированной задачи
    saveEdit: (state) => {
      const todo = state.items.find((todo) => todo.id === state.editId);
      if (todo && state.editText.trim() !== "") {
        todo.text = state.editText;
        saveTodosToLocalStorage(state.items); // Обновляем localStorage
      }
      state.editId = null;
      state.editText = "";
    },

    // Отмена редактирования задачи
    cancelEdit: (state) => {
      state.editId = null;
      state.editText = "";
    },

    // Обновление текста редактируемой задачи
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
  cancelEdit,
  setEditText,
} = todosSlice.actions;

export default todosSlice.reducer;
