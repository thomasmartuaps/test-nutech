import { call, put, takeEvery } from "redux-saga/effects";
import type { ModuleAction } from "../actions";
import { getBanners, getServices } from "~/api";
import type { Banner, ResponseData, Service } from "~/types";
import token from "~/utils/token";

function* bannerSaga(action: ModuleAction) {
  // Implement banner-related side effects here
  if (action.type !== "FETCH_BANNERS") {
    return;
  }
  try {
    const res: ResponseData<Banner[]> = yield call(getBanners);
    // Dispatch an action to set the banners in the store
    yield put({
      type: "SET_BANNERS",
      payload: {
        banners: res.data,
      },
    });
  } catch (error) {
    console.error("Error occurred while fetching banners:", error);
  }
}

function* serviceSaga(action: ModuleAction) {
  // Implement service-related side effects here
  if (action.type !== "FETCH_SERVICES") {
    return;
  }
  try {
    const tokenValue = token.get();
    if (!tokenValue) {
      console.error("No token found. User might not be logged in.");
      throw new Error("No token found. User might not be logged in.");
    }
    const res: ResponseData<Service[]> = yield call(getServices, tokenValue);
    // Dispatch an action to set the services in the store
    if (res.status === 108) {
      token.remove();
      return;
    }
    yield put({
      type: "SET_SERVICES",
      payload: {
        services: res.data,
      },
    });
  } catch (error: any) {
    if (error.response.data.status === 108) {
      token.remove();
      return;
    }
    console.error("Error occurred while fetching services:", error);
  }
}

export function* informationSagaWatcher() {
  yield takeEvery("FETCH_BANNERS", bannerSaga);
  yield takeEvery("FETCH_SERVICES", serviceSaga);
}
