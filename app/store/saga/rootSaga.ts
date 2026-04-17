import { all } from "redux-saga/effects";
import { userSagaWatcher } from "./userSaga";
import { moduleSagaWatcher } from "./modulesaga";
import { transactionSagaWatcher } from "./transactionSaga";

function* rootSaga() {
  yield all([userSagaWatcher(), moduleSagaWatcher(), transactionSagaWatcher()]);
}

export default rootSaga;
