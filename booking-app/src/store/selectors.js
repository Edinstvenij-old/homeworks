import { createSelector } from "reselect";

// Селекторы для получения данных, состояния загрузки и ошибок
export const selectHotelsData = (state) => state.hotels?.data;
export const selectLoading = (state) => state.hotels?.loading;
export const selectError = (state) => state.hotels?.error;

// Мемоизированный селектор, который возвращает только нужные данные
export const selectMemoizedHotels = createSelector(
  [selectHotelsData, selectLoading, selectError],
  (data, loading, error) => ({
    data, // Сохраняем данные отелей
    loading, // Сохраняем статус загрузки
    error, // Сохраняем ошибку, если она есть
  })
);
