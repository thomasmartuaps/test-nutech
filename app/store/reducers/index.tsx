import { combineReducers } from "redux";
import type { ModuleAction, UserAction } from "../actions";
import type { Banner, ProfileData, Service } from "~/types";
import type { Module } from "@reduxjs/toolkit/query";

interface UsersState {
  profile: ProfileData | null;
  balance: number;
  isLoading: boolean;
  regisErrorMessage: string;
  loginErrorMessage: string;
  profileErrorMessage: string;
}

const initUsersState: UsersState = {
  profile: null,
  balance: 0,
  isLoading: false,
  regisErrorMessage: "",
  loginErrorMessage: "",
  profileErrorMessage: "",
};

export function userReducer(state = initUsersState, action: UserAction) {
  const { type, payload } = action;
  switch (type) {
    case "REGISTRATION":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_PROFILE":
      console.log("Setting profile in reducer with payload:", payload);
      return {
        ...state,
        profile: payload.profile,
        isLoading: false,
      };
    case "SET_REGIS_ERROR":
      return {
        ...state,
        regisErrorMessage: payload.error,
        isLoading: false,
      };
    case "CLEAR_REGIS_ERROR":
      return {
        ...state,
        regisErrorMessage: "",
      };
    case "SET_LOGIN_ERROR":
      return {
        ...state,
        loginErrorMessage: payload.error,
        isLoading: false,
      };
    case "CLEAR_LOGIN_ERROR":
      return {
        ...state,
        loginErrorMessage: "",
      };
    case "SET_PROFILE_ERROR":
      return {
        ...state,
        profileErrorMessage: payload.error,
        isLoading: false,
      };
    case "CLEAR_PROFILE_ERROR":
      return {
        ...state,
        profileErrorMessage: "",
      };
    case "EDIT_USER":
      return {
        ...state,
        profile: payload.user,
      };
    default:
      return state;
  }
}

interface ModuleState {
  banners: Banner[];
  services: Service[];
  activeService: Service | null;
}

const initModuleState: ModuleState = {
  banners: [],
  services: [],
  activeService: null,
};

export function moduleReducer(state = initModuleState, action: ModuleAction) {
  const { type, payload } = action;
  switch (type) {
    case "SET_BANNERS":
      return {
        ...state,
        banners: payload.banners,
      };
    case "SET_SERVICES":
      return {
        ...state,
        services: payload.services,
      };
    case "SET_ACTIVE_SERVICE":
      return {
        ...state,
        activeService: payload.service,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  users: userReducer,
  modules: moduleReducer,
});
