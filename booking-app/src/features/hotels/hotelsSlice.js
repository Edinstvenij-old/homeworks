import { createSlice } from "@reduxjs/toolkit";

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    destinations: [],
    hotels: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchDestinationsRequest: (state) => {
      state.loading = true;
    },
    fetchDestinationsSuccess: (state, action) => {
      state.destinations = action.payload;
      state.loading = false;
    },
    fetchDestinationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchHotelsRequest: (state, action) => {
      state.loading = true;
    },
    fetchHotelsSuccess: (state, action) => {
      state.hotels = action.payload;
      state.loading = false;
    },
    fetchHotelsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchDestinationsRequest,
  fetchDestinationsSuccess,
  fetchDestinationsFailure,
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
} = hotelsSlice.actions;

export default hotelsSlice.reducer;
