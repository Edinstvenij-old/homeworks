import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: true,
  });

export const store = configureStore({
  reducer: {
    router: routerReducer,
    ...rootReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(routerMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const history = createReduxHistory(store);
