import { all, call, put, take, takeEvery } from "redux-saga/effects";
import { getBalance, getTransactions, initiateTransaction, topUp } from "~/api";
import type { ResponseData, Transaction } from "~/types";
import token from "~/utils/token";
import type { TransactionAction } from "../actions";

function* getBalanceSaga(action: TransactionAction) {
  if (action.type !== "GET_BALANCE") {
    return;
  }
  const tokenValue = token.get();
  try {
    if (!tokenValue) {
      console.error("No token found. User might not be logged in.");
      throw new Error("No token found. User might not be logged in.");
    }
    const res: ResponseData<{ balance: number }> = yield call(
      getBalance,
      tokenValue,
    );
    yield put({
      type: "SET_BALANCE",
      payload: {
        balance: res.data.balance.toString(),
      },
    });
  } catch (error: any) {
    if (error.response.data.status === 108) {
      token.remove();
      return;
    }
    console.error("Error fetching balance:", error);
  }
}

function* topUpSaga(action: TransactionAction) {
  if (action.type !== "TOP_UP") {
    return;
  }
  const tokenValue = token.get();
  if (!tokenValue) {
    console.error("No token found. User might not be logged in.");
    throw new Error("No token found. User might not be logged in.");
  }
  const res: ResponseData<{ token: string }> = yield call(topUp, {
    token: tokenValue,
    amount: action.payload.amount,
  });
  if (res.status !== 0) {
    if (res.status === 108) {
      token.remove();
      return;
    }
    yield put({
      type: "SET_TOP_UP_ERROR",
      payload: { error: res.message ?? "Failed to top up balance." },
    });
    return;
  }

  yield put({
    type: "TOP_UP_SUCCESS",
    payload: {},
  });
}

export function* topUpSuccessSaga(action: TransactionAction) {
  if (action.type !== "TOP_UP_SUCCESS") {
    return;
  }
  yield put({
    type: "GET_BALANCE",
    payload: {},
  });
  yield put({
    type: "CLEAR_TOP_UP_ERROR",
    payload: {},
  });
}

export function* getTransactionsSaga(action: TransactionAction) {
  if (action.type !== "FETCH_TRANSACTIONS") {
    return;
  }
  const tokenValue = token.get();
  if (!tokenValue) {
    console.error("No token found. User might not be logged in.");
    throw new Error("No token found. User might not be logged in.");
  }
  try {
    const { offset, limit } = action.payload;
    const res: ResponseData<{ records: Transaction[] }> = yield call(
      getTransactions,
      {
        token: tokenValue,
        offset,
        limit,
      },
    );
    yield put({
      type: "SET_TRANSACTIONS",
      payload: {
        transactions: res.data.records,
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

export function* transactionPaymentSaga(action: TransactionAction) {
  if (action.type !== "INITIATE_TRANSACTION") {
    return;
  }
  try {
    const tokenValue = token.get();
    if (!tokenValue) {
      console.error("No token found. User might not be logged in.");
      throw new Error("No token found. User might not be logged in.");
    }
    const res: ResponseData<Transaction> = yield call(initiateTransaction, {
      serviceCode: action.payload.serviceCode,
      token: tokenValue,
    });
    if (res.status !== 0) {
      if (res.status === 108) {
        token.remove();
        return;
      }
      yield put({
        type: "TRANSACTION_FAILED",
        payload: { error: res.message ?? "Failed to initiate transaction." },
      });
      return;
    }
    yield put({
      type: "TRANSACTION_SUCCESS",
      payload: {
        transaction: res.data,
      },
    });
  } catch (error) {
    console.error("Error initiating transaction:", error);
  }
}

export function* transactionSuccessSaga(action: TransactionAction) {
  if (action.type !== "TRANSACTION_SUCCESS") {
    return;
  }
  yield put({
    type: "GET_BALANCE",
    payload: {},
  });
  yield put({
    type: "CLEAR_TRANSACTION_ERROR",
    payload: {},
  });
}

export function* transactionSagaWatcher() {
  yield all([
    takeEvery("TOP_UP", topUpSaga),
    takeEvery("GET_BALANCE", getBalanceSaga),
    takeEvery("TOP_UP_SUCCESS", topUpSuccessSaga),
    takeEvery("FETCH_TRANSACTIONS", getTransactionsSaga),
    takeEvery("INITIATE_TRANSACTION", transactionPaymentSaga),
    takeEvery("TRANSACTION_SUCCESS", transactionSuccessSaga),
  ]);
}
