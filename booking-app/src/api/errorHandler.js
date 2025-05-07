import { toast } from "react-toastify";

// Централизованная обработка ошибок
export const handleError = (
  error,
  fallbackMessage = "Произошла ошибка при обращении к API"
) => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || fallbackMessage;

  console.error(`API Error ${status ? `(${status})` : ""}: ${message}`);
  toast.error(`Ошибка ${status || ""}: ${message}`);
  throw new Error(message);
};
