import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import hotelsReducer from "../features/hotels/hotelsSlice";
import rootSaga from "../features/hotels/hotelsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
