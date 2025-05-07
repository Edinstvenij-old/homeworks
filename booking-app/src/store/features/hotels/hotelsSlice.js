import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk для получения отелей
export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (city = "", { rejectWithValue }) => {
    try {
      const query = city ? `?city=${encodeURIComponent(city)}` : "";
      const url = `${import.meta.env.VITE_API_URL}/hotels${query}`;
      console.log("Fetching data from: ", url); // Логируем URL запроса
      const response = await axios.get(url);
      console.log("Fetched data:", response.data); // Логируем ответ от API
      if (!Array.isArray(response.data)) {
        throw new Error("API response is not an array");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching hotels:", error); // Логируем ошибку
      return rejectWithValue(
        error.response?.data?.message || error.message || "Ошибка загрузки отелей"
      );
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
        state.data = action.payload || [];
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Неизвестная ошибка";
      });
  },
});

export default hotelsSlice.reducer;
