import { all } from "redux-saga/effects";
import bookingSaga from "./features/booking/bookingSaga";
import hotelsSaga from "./features/hotels/hotelsSaga";

export default function* rootSaga() {
  yield all([bookingSaga(), hotelsSaga()]);
}
