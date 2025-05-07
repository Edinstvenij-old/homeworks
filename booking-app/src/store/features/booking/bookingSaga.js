import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "redux-first-history";
import { fetchHotels, sendBookingRequestAPI } from "../../../api/api";
import { setBookingData, setError, sendBookingRequest } from "./bookingSlice";
import { fetchHotelsSuccess } from "../hotels/hotelsSlice";

function* handleBooking({ payload }) {
  try {
    const bookingResponse = yield call(sendBookingRequestAPI, payload);
    yield put(setBookingData(bookingResponse));

    const hotelsResponse = yield call(fetchHotels);
    yield put(fetchHotelsSuccess(hotelsResponse?.data || hotelsResponse)); // исправили здесь

    yield put(push("/hotels"));
  } catch (error) {
    console.error("Error during booking:", error);
    yield put(
      setError(
        error.response?.data?.message || error.message || "Error during booking"
      )
    );
  }
}

export default function* bookingSaga() {
  yield takeLatest(sendBookingRequest.type, handleBooking);
}
