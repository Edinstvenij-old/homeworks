import { combineReducers } from "@reduxjs/toolkit";
import bookingReducer from "./features/booking/bookingSlice";
import hotelsReducer from "./features/hotels/hotelsSlice";

const rootReducer = combineReducers({
  booking: bookingReducer,
  hotels: hotelsReducer,
});

export default rootReducer;
