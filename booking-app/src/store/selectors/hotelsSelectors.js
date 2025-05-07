import { createSelector } from "reselect";

const defaultHotelsState = { data: [], loading: false, error: null };

export const selectHotelsState = (state) => state.hotels ?? defaultHotelsState;

export const selectHotelsData = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.data
);

export const selectLoading = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.loading
);

export const selectError = createSelector(
  [selectHotelsState],
  (hotelsState) => hotelsState.error
);
