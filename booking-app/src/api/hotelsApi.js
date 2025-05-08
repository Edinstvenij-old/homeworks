import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchDestinations = () => axios.get(`${API}/destination`);
export const fetchHotels = (destinationId) =>
  axios.get(`${API}/hotels`, { params: { destinationId } });
