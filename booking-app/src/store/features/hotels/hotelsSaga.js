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
    const { destinationId, priceRange } = action.payload || {};
    const filters = {
      destinationId,
      price_gte: priceRange?.min || null,
      price_lte: priceRange?.max || null,
    };

    if (typeof filters !== "object" || filters === null) {
      throw new Error("Filters must be an object");
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
