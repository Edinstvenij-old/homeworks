import { createSelector } from "reselect";

// ✅ Используем константу, чтобы не создавать новый объект каждый раз
const defaultHotelsState = { data: [], loading: false, error: null };

export const selectHotelsState = (state) => state.hotels ?? defaultHotelsState;

export const selectHotelsData = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.data
);

// 🧠 Фабрика мемоизированного селектора по городу
export const makeSelectHotelsByCity = () =>
  createSelector([selectHotelsData, (_, city) => city], (hotels, city) => {
    if (!city) return hotels;
    return hotels.filter(
      (hotel) => hotel.city && hotel.city.toLowerCase() === city.toLowerCase()
    );
  });

export const selectLoading = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.loading
);

export const selectError = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.error
);
