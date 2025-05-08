import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createReduxHistoryContext } from "redux-first-history";
import { history } from "./history";
import hotelsReducer from "../features/hotels/hotelsSlice";
import rootSaga from "../features/hotels/hotelsSaga";

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history });

export const store = configureStore({
  reducer: {
    router: routerReducer,
    hotels: hotelsReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(routerMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const appHistory = createReduxHistory(store);
