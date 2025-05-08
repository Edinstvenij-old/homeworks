import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destinations: [],
  hotels: [],
  loading: false,
  error: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    // Загрузка списка городов
    fetchDestinationsRequest: (state) => {
      state.loading = true;
      state.error = null; // сброс ошибки
    },
    fetchDestinationsSuccess: (state, action) => {
      state.destinations = action.payload;
      state.loading = false;
    },
    fetchDestinationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Загрузка отелей по городу (destinationId)
    fetchHotelsRequest: (state, action) => {
      state.loading = true;
      state.error = null; // сброс ошибки
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
