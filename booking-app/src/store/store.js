import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import rootReducer from "./rootReducer";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    reduxTravelling: true,
  });

const combinedReducer = {
  ...rootReducer,
  router: routerReducer,
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefault) => getDefault().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
