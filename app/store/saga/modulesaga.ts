import { call, put, takeEvery } from "redux-saga/effects";
import type { ModuleAction } from "../actions";
import { getBanners, getServices } from "~/api";
import type { Banner, Service } from "~/types";

function* bannerSaga(action: ModuleAction) {
  // Implement banner-related side effects here
  if (action.type === "FETCH_BANNERS") {
    return;
  }
  try {
    const banners: Banner[] = yield call(getBanners);
    // Dispatch an action to set the banners in the store
    yield put({
      type: "SET_BANNERS",
      payload: {
        banners,
      },
    });
  } catch (error) {
    console.error("Error occurred while fetching banners:", error);
  }
}

function* serviceSaga(action: ModuleAction) {
  // Implement service-related side effects here
  if (action.type === "FETCH_SERVICES") {
    return;
  }
  try {
    const services: Service[] = yield call(getServices);
    // Dispatch an action to set the services in the store
    yield put({
      type: "SET_SERVICES",
      payload: {
        services,
      },
    });
  } catch (error) {
    console.error("Error occurred while fetching services:", error);
  }
}

export function* moduleSagaWatcher() {
  yield takeEvery("FETCH_BANNERS", bannerSaga);
  yield takeEvery("FETCH_SERVICES", serviceSaga);
}
