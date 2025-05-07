import API from "./axiosInstance";
import { handleError } from "./errorHandler";

export const fetchDestinations = async () => {
  try {
    const { data } = await API.get("/destination");
    if (!Array.isArray(data)) throw new Error("Destinations response is not an array");
    return data;
  } catch (error) {
    handleError(error);
  }
};
