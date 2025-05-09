import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Получение списка направлений
export const fetchDestinations = () => {
  return axios.get(`${API}/destination`);
};

// Получение отелей с фильтрами: destinationId, price_gte, price_lte и др.
export const fetchHotels = (filters = {}) => {
  // Убедимся, что filters — объект
  if (typeof filters !== "object" || filters === null) {
    filters = {}; // Если передан неверный формат, просто передаем пустой объект
  }

  return axios.get(`${API}/hotels`, { params: filters });
};
