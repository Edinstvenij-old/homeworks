import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерсептор только логирует ошибку (без toast!)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    console.error(`API Error ${status ? `(${status})` : ""}: ${message}`);
    return Promise.reject(error); // Пробрасываем дальше
  }
);

export default API;
