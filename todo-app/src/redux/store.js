import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { devToolsEnhancer } from "@redux-devtools/extension";

import todosReducer from "./reducers/todosReducer";
import rootSaga from "./sagas/todosSaga";

const rootReducer = combineReducers({
  todos: todosReducer,
});

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  import.meta.env.MODE === "development"
    ? compose(applyMiddleware(sagaMiddleware), devToolsEnhancer())
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
