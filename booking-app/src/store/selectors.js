import { createSelector } from "reselect";

export const selectHotelsData = (state) => state.hotels?.data;
export const selectLoading = (state) => state.hotels?.loading;
export const selectError = (state) => state.hotels?.error;

export const selectMemoizedHotels = createSelector(
  [selectHotelsData, selectLoading, selectError],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);
