import {
  SET_TODOS,
  ADD_TODO_SUCCESS,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  CLEAR_COMPLETED,
  SET_FILTER,
} from "../actions/todosActions";

// Сохраняем в localStorage
const saveToLocalStorage = (items) => {
  try {
    if (Array.isArray(items) && items.length > 0) {
      localStorage.setItem("todos", JSON.stringify(items));
    } else {
      localStorage.removeItem("todos");
    }
  } catch (error) {
    console.error("Failed to save todos to localStorage:", error);
  }
};

// Загружаем из localStorage
const loadFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [];
  }
};

const initialState = {
  items: loadFromLocalStorage(),
  filter: "all",
};

const todosReducer = (state = initialState, action) => {
  let updatedItems;

  switch (action.type) {
    case SET_TODOS:
      saveToLocalStorage(action.payload);
      return { ...state, items: action.payload };

    case ADD_TODO_SUCCESS:
      updatedItems = [...state.items, action.payload];
      saveToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };

    case DELETE_TODO:
      updatedItems = state.items.filter((todo) => todo.id !== action.payload);
      saveToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };

    case TOGGLE_TODO:
      updatedItems = state.items.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      saveToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };

    case EDIT_TODO:
      updatedItems = state.items.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text.trim() }
          : todo
      );
      saveToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };

    case CLEAR_COMPLETED:
      updatedItems = state.items.filter((todo) => !todo.completed);
      saveToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };

    case SET_FILTER:
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export default todosReducer;
