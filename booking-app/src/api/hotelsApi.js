import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchDestinations = () => {
  return axios.get(`${API}/destination`).catch((error) => {
    console.error("Error fetching destinations:", error);
    throw error;
  });
};

export const fetchHotels = (filters = {}) => {
  if (
    typeof filters !== "object" ||
    filters === null ||
    Array.isArray(filters)
  ) {
    filters = {};
  }

  return axios.get(`${API}/hotels`, { params: filters }).catch((error) => {
    console.error("Error fetching hotels:", error);
    throw error;
  });
};
