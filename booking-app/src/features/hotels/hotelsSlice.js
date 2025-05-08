import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: [],
  hotels: [],
  loading: false,
  error: null,
  selectedDestinationId: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    // Загрузка направлений
    fetchDestinationsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDestinationsSuccess: (state, action) => {
      state.destinations = action.payload;
      state.loading = false;
    },
    fetchDestinationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Загрузка отелей
    fetchHotelsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.selectedDestinationId = action.payload ?? null;
      state.hotels = []; // очищаем старые отели перед загрузкой новых
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
