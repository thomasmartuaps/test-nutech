import { all, call, put, takeEvery } from "redux-saga/effects";
import type { LoginResponseData, ResponseData } from "~/types";
import token from "~/utils/token";
import type { UserAction } from "../actions";
import { login, registration } from "~/api";

function* registrationSaga(action: UserAction) {
  if (action.type !== "REGISTRATION") {
    return;
  }
  try {
    const res: ResponseData = yield call(registration, { ...action.payload });
    yield put({
      type: "SET_USERS",
      payload: {},
    });
  } catch (error) {
    console.error("Error occurred while registering user:", error);
  }
}

function* loginSaga(action: UserAction) {
  if (action.type !== "LOGIN") {
    return;
  }
  try {
    const res: LoginResponseData = yield call(login, action.payload);
    yield put({
      type: "SET_USERS",
      payload: {},
    });
    token.save(res.data.token);
  } catch (error) {
    console.error("Error occurred while logging in user:", error);
  }
}

export function* userSagaWatcher() {
  yield all([
    takeEvery("REGISTRATION", registrationSaga),
    takeEvery("LOGIN", loginSaga),
  ]);
}
