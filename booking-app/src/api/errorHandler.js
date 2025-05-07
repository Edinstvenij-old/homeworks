import { toast } from "react-toastify";
import api from "./api"; // Ваш axios экземпляр

// Централизованная обработка ошибок
export const handleError = (
  error,
  fallbackMessage = "Произошла ошибка при обращении к API"
) => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || fallbackMessage;

  console.error(`API Error ${status ? `(${status})` : ""}: ${message}`);

  // Логируем ответ, если это не массив, чтобы легче было диагностировать
  if (error?.response?.data) {
    console.error("Received response data:", error?.response?.data);
    if (Array.isArray(error?.response?.data)) {
      console.log("Received array:", error?.response?.data);
    } else {
      console.error("Received non-array data:", error?.response?.data);
    }
  }

  toast.error(`Ошибка ${status || ""}: ${message}`);
};

// Функция для получения направлений
export const fetchDestinations = async () => {
  try {
    const response = await api.get("/destination");

    // Логирование всей полученной информации для диагностики
    console.log("Received full response:", response);

    // Проверка типа данных в ответе
    const responseData = response?.data;
    console.log("Type of response.data:", typeof responseData);

    // Дополнительные логирования, чтобы понять, что именно приходит
    if (responseData) {
      console.log(
        "First few elements of response data:",
        responseData.slice(0, 5)
      );
    }

    // Проверка, является ли responseData массивом
    if (Array.isArray(responseData)) {
      return responseData; // Возвращаем данные, если это массив
    } else {
      console.error("Expected an array, but received:", responseData);
      toast.error(
        "Не удалось загрузить направления: получены некорректные данные."
      );
      return []; // Возвращаем пустой массив, но показываем ошибку
    }
  } catch (error) {
    handleError(error, "Не удалось получить направления.");
    toast.error("Произошла ошибка при загрузке направлений.");
    return []; // Возвращаем пустой массив, но ошибка уже будет логироваться
  }
};
