import { createSlice } from "@reduxjs/toolkit";

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchHotels: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHotelsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHotelsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchHotels, fetchHotelsSuccess, fetchHotelsFailure } =
  hotelsSlice.actions;

export default hotelsSlice.reducer;
