import API from "./axiosInstance";
import { handleError } from "./errorHandler";

// Получение списка отелей
export const fetchHotels = async (params = {}) => {
  try {
    const { data } = await API.get("/hotels", { params });
    if (!Array.isArray(data)) {
      throw new Error("Hotels response is not an array");
    }
    return data;
  } catch (error) {
    handleError(error, "Failed to fetch hotels");
  }
};

// Получение одного отеля
export const fetchHotelById = async (id) => {
  try {
    const { data } = await API.get(`/hotels/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Failed to fetch hotel with ID ${id}`);
  }
};

// Получение направлений
export const fetchDestinations = async () => {
  try {
    const { data } = await API.get("/destination");
    if (!Array.isArray(data)) {
      throw new Error("Destinations response is not an array");
    }
    return data;
  } catch (error) {
    handleError(error, "Failed to fetch destinations");
  }
};

// Отправка заявки на бронирование
export const sendBookingRequestAPI = async (bookingData) => {
  try {
    const { data } = await API.post("/booking", bookingData);
    return data;
  } catch (error) {
    handleError(error, "Failed to send booking request");
  }
};
