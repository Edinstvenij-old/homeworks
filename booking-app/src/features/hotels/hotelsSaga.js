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
import { push } from "redux-first-history";

function* loadDestinations() {
  try {
    const { data } = yield call(fetchDestinations);
    yield put(fetchDestinationsSuccess(data));
  } catch (error) {
    yield put(fetchDestinationsFailure(error.message));
  }
}

function* loadHotels(action) {
  try {
    const { data } = yield call(fetchHotels, action.payload);
    yield put(fetchHotelsSuccess(data));
    yield put(push("/hotels"));
  } catch (error) {
    yield put(fetchHotelsFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchDestinationsRequest.type, loadDestinations),
    takeLatest(fetchHotelsRequest.type, loadHotels),
  ]);
}
