import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/?page=${page}`
      );
      if (!response.ok) {
        throw new Error("Не вдалося завантажити персонажів");
      }
      const data = await response.json();
      return { ...data, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    items: JSON.parse(localStorage.getItem("people")) || [],
    status: "idle",
    error: null,
    currentPage: 0,
    totalCount: null,
    next: "https://swapi.py4e.com/api/people/?page=1",
  },
  reducers: {
    clearData: (state) => {
      state.items = [];
      state.currentPage = 0;
      state.totalCount = null;
      state.next = "https://swapi.py4e.com/api/people/?page=1";
      localStorage.removeItem("people");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { results, page, next, count } = action.payload;

        state.items = page === 1 ? results : [...state.items, ...results];
        state.currentPage = page;
        state.totalCount = count;
        state.next = next;

        localStorage.setItem("people", JSON.stringify(state.items));
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearData } = peopleSlice.actions;
export default peopleSlice.reducer;
