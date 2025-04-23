import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { swapiReducer } from "./reducer";

const rootReducer = combineReducers({
  swapi: swapiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
