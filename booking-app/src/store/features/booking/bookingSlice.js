import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    sendBookingRequest: (state) => {
      state.loading = true;
      state.error = null; // При отправке запроса, сбрасываем ошибки
    },
    setBookingData: (state, action) => {
      state.loading = false;
      state.data = action.payload; // Сохраняем данные бронирования
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Сохраняем ошибку
    },
  },
});

export const { sendBookingRequest, setBookingData, setError } =
  bookingSlice.actions;
export default bookingSlice.reducer;
