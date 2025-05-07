import { call, put, takeLatest } from "redux-saga/effects";
import { fetchHotels as fetchHotelsAPI } from "../../../api/hotelApi";
import {
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
} from "./hotelsSlice";

// Сага для обработки запроса отелей
function* handleFetchHotels(action) {
  try {
    const city = action.payload?.city; // Получаем city из переданных данных
    const response = yield call(fetchHotelsAPI, { city }); // Запрос к API с городом
    yield put(fetchHotelsSuccess(response?.data || response)); // Если запрос успешен, передаем данные
  } catch (error) {
    yield put(
      fetchHotelsFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch hotels"
      ) // Обрабатываем ошибку
    );
  }
}

export default function* hotelsSaga() {
  yield takeLatest(fetchHotelsRequest.type, handleFetchHotels); // Подписываемся на fetchHotelsRequest
}
