import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async (page = 1) => {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/?page=${page}`
    );
    const data = await response.json();
    return data;
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.results;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearData } = peopleSlice.actions;

export default peopleSlice.reducer;
