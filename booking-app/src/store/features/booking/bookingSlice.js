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
      state.error = null;
    },
    setBookingData: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sendBookingRequest, setBookingData, setError } =
  bookingSlice.actions;
export default bookingSlice.reducer;
