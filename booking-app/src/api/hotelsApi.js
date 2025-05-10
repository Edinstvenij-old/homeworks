import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchDestinations = () => {
  return axios.get(`${API}/destination`);
};

export const fetchHotels = (filters = {}) => {
  if (typeof filters !== "object" || filters === null) {
    filters = {};
  }

  return axios.get(`${API}/hotels`, { params: filters });
};
