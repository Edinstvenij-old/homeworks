import { call, put, takeLatest } from "redux-saga/effects";
import { fetchHotels as fetchHotelsAPI } from "../../../api/api";
import {
  fetchHotels,
  fetchHotelsSuccess,
  fetchHotelsFailure,
} from "./hotelsSlice";

function* handleFetchHotels(action) {
  try {
    const city = action.payload?.city;
    const response = yield call(fetchHotelsAPI, city);
    yield put(fetchHotelsSuccess(response?.data || response));
  } catch (error) {
    yield put(
      fetchHotelsFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch hotels"
      )
    );
  }
}

export default function* hotelsSaga() {
  yield takeLatest(fetchHotels.type, handleFetchHotels);
}
