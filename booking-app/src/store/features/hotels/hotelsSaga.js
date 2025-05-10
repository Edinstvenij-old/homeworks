import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDestinationsRequest,
  fetchDestinationsSuccess,
  fetchDestinationsFailure,
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
} from "./hotelsSlice";
import { fetchDestinations, fetchHotels } from "../../../api/hotelsApi";

function* loadDestinations() {
  try {
    const response = yield call(fetchDestinations);
    yield put(fetchDestinationsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchDestinationsFailure(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load destinations"
      )
    );
  }
}

function* loadHotels(action) {
  try {
    const { destinationId = null, priceRange = {} } = action.payload || {};
    const { min = null, max = null } = priceRange;

    const filters = {};

    if (destinationId) {
      filters.destinationId = destinationId;
    }
    if (min !== null) {
      filters.price_gte = min;
    }
    if (max !== null) {
      filters.price_lte = max;
    }

    const response = yield call(fetchHotels, filters);
    yield put(fetchHotelsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchHotelsFailure(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load hotels"
      )
    );
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchDestinationsRequest.type, loadDestinations),
    takeLatest(fetchHotelsRequest.type, loadHotels),
  ]);
}
