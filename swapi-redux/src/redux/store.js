import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./peopleSlice";

const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export default store;
