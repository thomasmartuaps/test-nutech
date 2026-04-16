import { all, call, put, takeEvery } from "redux-saga/effects";
import { getBalance } from "~/api";
import type { ResponseData } from "~/types";
import token from "~/utils/token";

function* getBalanceSaga(action: any) {
  if (action.type !== "GET_BALANCE") {
    return;
  }
  const tokenValue = token.get();
  if (!tokenValue) {
    console.error("No token found. User might not be logged in.");
    throw new Error("No token found. User might not be logged in.");
  }
  const res: ResponseData<{ balance: number }> = yield call(
    getBalance,
    tokenValue,
  );
  if (res.status === 108) {
    token.remove();
    return;
  }
  yield put({
    type: "SET_BALANCE",
    payload: {
      balance: res.data.balance,
    },
  });
}

function* topUpSaga(action: any) {
  if (action.type !== "TOP_UP") {
    return;
  }
}

export function* transactionSagaWatcher() {
  yield all([
    takeEvery("TOP_UP", topUpSaga),
    takeEvery("GET_BALANCE", getBalanceSaga),
  ]);
}
