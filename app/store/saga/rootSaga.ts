import { all } from "redux-saga/effects";
import { userSagaWatcher } from "./userSaga";

function* rootSaga() {
  yield all([userSagaWatcher()]);
}

export default rootSaga;
