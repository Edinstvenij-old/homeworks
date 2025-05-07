import API from "./axiosInstance";
import { handleError } from "./errorHandler";

export const sendBookingRequestAPI = async (bookingData) => {
  try {
    const { data } = await API.post("/booking", bookingData);
    return data;
  } catch (error) {
    handleError(error);
  }
};
