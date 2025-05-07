import API from "./axiosInstance";
import { handleError } from "./errorHandler";

export const fetchHotels = async (params = {}) => {
  try {
    const { data } = await API.get("/hotels", { params });
    if (!Array.isArray(data))
      throw new Error("Hotels response is not an array");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchHotelById = async (id) => {
  try {
    const { data } = await API.get(`/hotels/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
