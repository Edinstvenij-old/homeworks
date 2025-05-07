import { createSelector } from "reselect";

export const selectHotelsState = (state) =>
  state.hotels || { data: [], loading: false, error: null };
export const selectHotelsData = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.data
);

// 🧠 Фабрика мемоизированного селектора по городу
export const makeSelectHotelsByCity = () =>
  createSelector([selectHotelsData, (_, city) => city], (hotels, city) => {
    if (!city) return hotels;
    return hotels.filter(
      (hotel) => hotel.city.toLowerCase() === city.toLowerCase()
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
