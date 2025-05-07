import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk для получения отелей
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (city = "", { rejectWithValue }) => {
    try {
      const query = city ? `?city=${encodeURIComponent(city)}` : "";
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/hotels${query}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Ошибка загрузки отелей");
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Обновляем только при изменении ссылочно
        if (state.data !== action.payload) {
          state.data = action.payload;
        }
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hotelsSlice.reducer;
