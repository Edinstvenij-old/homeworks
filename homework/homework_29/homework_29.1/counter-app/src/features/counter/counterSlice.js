import { createSlice } from "@reduxjs/toolkit";

const getInitialValue = () => {
  const saved = localStorage.getItem("counter");
  return saved !== null ? JSON.parse(saved) : 0;
};

const initialState = {
  value: getInitialValue(),
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      localStorage.setItem("counter", JSON.stringify(state.value));
    },
    decrement: (state) => {
      state.value -= 1;
      localStorage.setItem("counter", JSON.stringify(state.value));
    },
    reset: (state) => {
      state.value = 0;
      localStorage.setItem("counter", JSON.stringify(0));
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
