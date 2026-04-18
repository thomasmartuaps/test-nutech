import { all } from "redux-saga/effects";
import { userSagaWatcher } from "./userSaga";
import { informationSagaWatcher } from "./informationSaga";
import { transactionSagaWatcher } from "./transactionSaga";

function* rootSaga() {
  yield all([
    userSagaWatcher(),
    informationSagaWatcher(),
    transactionSagaWatcher(),
  ]);
}

export default rootSaga;
