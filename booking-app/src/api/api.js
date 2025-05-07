import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    toast.error(`Error ${status || ""}: ${message}`);
    return Promise.reject(error);
  }
);

const handleError = (error) => {
  const errorMessage =
    error?.response?.data?.message || error?.message || "Unexpected API error";
  console.error("API Error:", errorMessage);
  throw new Error(errorMessage);
};

export const fetchDestinations = async () => {
  try {
    const { data } = await API.get("/destination");
    if (Array.isArray(data)) return data;
    throw new Error("Response is not an array");
  } catch (error) {
    handleError(error);
  }
};

export const fetchHotels = async (params = {}) => {
  try {
    const { data } = await API.get("/hotels", { params });
    if (Array.isArray(data)) return data;
    throw new Error("Hotels response is not an array");
  } catch (error) {
    handleError(error);
  }
};

export const fetchHotelById = async (id) => {
  try {
    const { data } = await API.get(`/hotels/${id}`);
    if (data) return data;
    throw new Error("No hotel data returned");
  } catch (error) {
    handleError(error);
  }
};

export const sendBookingRequestAPI = async (bookingData) => {
  try {
    const { data } = await API.post("/booking", bookingData);
    if (data) return data;
    throw new Error("No booking response returned");
  } catch (error) {
    handleError(error);
  }
};
