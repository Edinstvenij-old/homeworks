import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Получение списка направлений
export const fetchDestinations = () => axios.get(`${API}/destination`);

// Получение отелей по ID направления или всех отелей
export const fetchHotels = (destinationId) => {
  const params = destinationId ? { destinationId } : {};
  return axios.get(`${API}/hotels`, { params });
};
