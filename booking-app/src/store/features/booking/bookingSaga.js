import { call, put, takeLatest } from "redux-saga/effects";
import { push } from "redux-first-history";
import { sendBookingRequestAPI } from "../../../api/bookingApi"; // Оставляем только sendBookingRequestAPI
import { fetchHotels } from "../../../api/hotelApi"; // Импортируем функцию fetchHotels из hotelApi.js
import { setBookingData, setError, sendBookingRequest } from "./bookingSlice";
import { fetchHotelsSuccess } from "../hotels/hotelsSlice";

function* handleBooking({ payload }) {
  try {
    // Отправка запроса на бронирование
    const bookingResponse = yield call(sendBookingRequestAPI, payload);
    yield put(setBookingData(bookingResponse));

    // Получение списка отелей
    const hotelsResponse = yield call(fetchHotels); // Получаем список отелей, функция должна быть из hotelApi
    yield put(fetchHotelsSuccess(hotelsResponse?.data || hotelsResponse));

    // Перенаправление на страницу отелей
    yield put(push("/hotels"));
  } catch (error) {
    console.error("Error during booking:", error);

    // В случае ошибки, передаем сообщение об ошибке в store
    yield put(
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Error during booking"
      )
    );
  }
}

export default function* bookingSaga() {
  yield takeLatest(sendBookingRequest.type, handleBooking);
}
