import { all } from "redux-saga/effects";
import { todosSaga } from "../features/todos/todosSaga";

export default function* rootSaga() {
  yield all([todosSaga()]);
}
