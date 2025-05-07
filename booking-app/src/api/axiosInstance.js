import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Логируем ошибку в консоль, но не перехватываем окончательно
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    console.error(`API Error ${status ? `(${status})` : ""}: ${message}`);
    return Promise.reject(error);
  }
);

export default API;
