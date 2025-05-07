import { toast } from "react-toastify";

export const handleError = (
  error,
  fallbackMessage = "Unexpected API error"
) => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || fallbackMessage;

  // Логируем ошибку
  console.error(`API Error ${status ? `(${status})` : ""}: ${message}`);
  toast.error(`Error ${status || ""}: ${message}`);
  throw new Error(message); // Бросаем дальше, если нужно catch'ем
};
