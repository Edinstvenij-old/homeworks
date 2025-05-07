import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendBookingRequestAPI } from "../../../api/api";

export const sendBooking = createAsyncThunk(
  "booking/sendBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await sendBookingRequestAPI(bookingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
