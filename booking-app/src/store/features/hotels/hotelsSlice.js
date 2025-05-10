import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: [],
  hotels: [],
  loading: false,
  error: null,
  selectedDestinationId: null,
  priceRange: { min: null, max: null },
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    // Destinations
    fetchDestinationsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDestinationsSuccess(state, action) {
      state.destinations = action.payload;
      state.loading = false;
    },
    fetchDestinationsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    // Hotels
    fetchHotelsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.hotels = [];

      const { destinationId = null, priceRange = { min: null, max: null } } =
        action.payload || {};

      state.selectedDestinationId = destinationId;
      state.priceRange = priceRange;
    },
    fetchHotelsSuccess(state, action) {
      state.hotels = action.payload;
      state.loading = false;
    },
    fetchHotelsFailure(state, action) {
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
