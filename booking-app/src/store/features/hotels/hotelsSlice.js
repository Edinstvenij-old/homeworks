import { createSlice } from "@reduxjs/toolkit";

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchHotelsRequest: (state) => {
      // изменил название
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

export const { fetchHotelsRequest, fetchHotelsSuccess, fetchHotelsFailure } =
  hotelsSlice.actions;

export default hotelsSlice.reducer;
