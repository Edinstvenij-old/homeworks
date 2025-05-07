import axios from "axios";
import { handleError } from "./errorHandler";

// Создаем экземпляр axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Логируем ошибку в ответе
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    console.error(`API Error ${status ? `(${status})` : ""}: ${message}`);
    // Вызов функции для обработки ошибок
    handleError(error, `API Error ${status ? `(${status})` : ""}: ${message}`);
    return Promise.reject(error); // Прокидываем дальше
  }
);

// Получение списка отелей
export const fetchHotels = async (params = {}) => {
  try {
    const { data } = await api.get("/hotels", { params });
    if (!Array.isArray(data)) {
      throw new Error("Hotels response is not an array");
    }
    return data;
  } catch (error) {
    handleError(error, "Failed to fetch hotels");
    throw error; // Прокидываем ошибку дальше
  }
};

// Получение одного отеля по ID
export const fetchHotelById = async (id) => {
  try {
    const { data } = await api.get(`/hotels/${id}`);
    return data;
  } catch (error) {
    handleError(error, `Failed to fetch hotel with ID ${id}`);
    throw error; // Прокидываем ошибку дальше
  }
};

// Получение направлений
export const fetchDestinations = async () => {
  try {
    const { data } = await api.get("/destination");
    if (!Array.isArray(data)) {
      throw new Error("Destinations response is not an array");
    }
    return data;
  } catch (error) {
    handleError(error, "Failed to fetch destinations");
    throw error; // Прокидываем ошибку дальше
  }
};

// Отправка заявки на бронирование
export const sendBookingRequestAPI = async (bookingData) => {
  try {
    const { data } = await api.post("/booking", bookingData);
    return data;
  } catch (error) {
    handleError(error, "Failed to send booking request");
    throw error; // Прокидываем ошибку дальше
  }
};

export default api;
