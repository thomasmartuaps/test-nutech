import { all, call, put, takeEvery } from "redux-saga/effects";
import type { ProfileData, ResponseData } from "~/types";
import token from "~/utils/token";
import type { UserAction } from "../actions";
import { getProfile, login, registration } from "~/api";

function* registrationSaga(action: UserAction) {
  if (action.type !== "REGISTRATION") {
    return;
  }
  try {
    const res: ResponseData<null> = yield call(registration, {
      ...action.payload.data,
    });
    if (res.status !== 0) {
      yield put({
        type: "SET_REGIS_ERROR",
        payload: { error: res.message ?? "Failed to register user." },
      });
      return;
    }
    yield put({
      type: "CLEAR_REGIS_ERROR",
      payload: {},
    });
  } catch (error: any) {
    if (error.response.data.message) {
      yield put({
        type: "SET_REGIS_ERROR",
        payload: {
          error: error.response.data.message ?? "Failed to register user.",
        },
      });
      return;
    }
    console.error("Error occurred while registering user:", error);
  }
}

function* loginSaga(action: UserAction) {
  if (action.type !== "LOGIN") {
    return;
  }
  try {
    const res: ResponseData<{ token: string }> = yield call(
      login,
      action.payload.data,
    );
    if (res.status !== 0) {
      yield put({
        type: "SET_LOGIN_ERROR",
        payload: { error: res.message ?? "Failed to login user." },
      });
      return;
    }
    token.save(res.data.token);
    yield put({
      type: "CLEAR_LOGIN_ERROR",
      payload: {},
    });
  } catch (error: any) {
    if (error.response.data.message) {
      yield put({
        type: "SET_LOGIN_ERROR",
        payload: {
          error: error.response.data.message ?? "Failed to login user.",
        },
      });
      return;
    }
    console.error("Error occurred while logging in user:", error);
  }
}

function* logoutSaga(action: UserAction) {
  if (action.type !== "LOGOUT") {
    return;
  }
  try {
    token.remove();
  } catch (error) {
    console.error("Error occurred while logging out user:", error);
  }
}

function* fetchProfileSaga(action: UserAction) {
  if (action.type !== "FETCH_PROFILE") {
    return;
  }
  try {
    const tokenValue = token.get();
    if (!tokenValue) {
      console.error("No token found. User might not be logged in.");
      throw new Error("No token found. User might not be logged in.");
    }
    const res: ResponseData<ProfileData> = yield call(getProfile, tokenValue);

    if (res.status === 108) {
      token.remove();
      return;
    }
    const profile = res.data;
    yield put({
      type: "SET_PROFILE",
      payload: { profile },
    });
  } catch (error: any) {
    if (error.response.data.status === 108) {
      token.remove();
      return;
    }
    console.error("Error occurred while fetching user profile:", error);
  }
}

export function* userSagaWatcher() {
  yield all([
    takeEvery("REGISTRATION", registrationSaga),
    takeEvery("LOGIN", loginSaga),
    takeEvery("FETCH_PROFILE", fetchProfileSaga),
    takeEvery("LOGOUT", logoutSaga),
  ]);
}
