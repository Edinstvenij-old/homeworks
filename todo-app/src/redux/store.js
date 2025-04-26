import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { devToolsEnhancer } from "@redux-devtools/extension";

import todosReducer from "./reducers/todosReducer";
import rootSaga from "./sagas/todosSaga";

const rootReducer = combineReducers({
  todos: todosReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const enhancer =
  import.meta.env.MODE === "development"
    ? compose(middleware, devToolsEnhancer())
    : middleware;

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
