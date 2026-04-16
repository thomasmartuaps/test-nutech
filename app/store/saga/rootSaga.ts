import { all } from "redux-saga/effects";
import { userSagaWatcher } from "./userSaga";
import { moduleSagaWatcher } from "./modulesaga";

function* rootSaga() {
  yield all([userSagaWatcher(), moduleSagaWatcher()]);
}

export default rootSaga;
