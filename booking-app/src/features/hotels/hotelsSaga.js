import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDestinationsRequest,
  fetchDestinationsSuccess,
  fetchDestinationsFailure,
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
} from "./hotelsSlice";
import { fetchDestinations, fetchHotels } from "../../api/hotelsApi";

function* loadDestinations() {
  try {
    const response = yield call(fetchDestinations);
    yield put(fetchDestinationsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchDestinationsFailure(error.message || "Failed to load destinations")
    );
  }
}

function* loadHotels(action) {
  try {
    const destinationId = action.payload; // получаем destinationId из action
    const response = yield call(fetchHotels, destinationId || ""); // Если destinationId отсутствует, получаем все отели
    yield put(fetchHotelsSuccess(response.data));
  } catch (error) {
    yield put(fetchHotelsFailure(error.message || "Failed to load hotels"));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchDestinationsRequest.type, loadDestinations),
    takeLatest(fetchHotelsRequest.type, loadHotels),
  ]);
}
