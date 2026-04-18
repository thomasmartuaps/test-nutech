import { combineReducers } from "redux";
import type { ModuleAction, UserAction } from "../actions";
import type { Banner, ProfileData, Service } from "~/types";
import { transactionReducer } from "./transaction";
import { uploadProfilePicture } from "~/api";
import { informationReducer } from "./information";

interface UsersState {
  profile: ProfileData | null;
  isLoading: boolean;
  isRegistrationSuccess: boolean;
  regisErrorMessage: string;
  loginErrorMessage: string;
  profileErrorMessage: string;
  editProfileSuccessMessage: string;
  editProfileErrorMessage: string;
  uploadPictureErrorMessage: string;
  uploadPictureSuccessMessage: string;
}

const initUsersState: UsersState = {
  profile: null,
  isLoading: false,
  isRegistrationSuccess: false,
  regisErrorMessage: "",
  loginErrorMessage: "",
  profileErrorMessage: "",
  editProfileSuccessMessage: "",
  editProfileErrorMessage: "",
  uploadPictureErrorMessage: "",
  uploadPictureSuccessMessage: "",
};

export function userReducer(state = initUsersState, action: UserAction) {
  const { type, payload } = action;
  switch (type) {
    case "REGISTRATION":
      return {
        ...state,
        isLoading: true,
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        isRegistrationSuccess: true,
      };
    case "CLEAR_REGISTRATION_SUCCESS":
      return {
        ...state,
        isRegistrationSuccess: false,
      };
    case "SET_PROFILE":
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
        editProfileErrorMessage: "",
      };
    case "EDIT_USER_SUCCESS":
      return {
        ...state,
        editProfileSuccessMessage: payload.message,
      };
    case "EDIT_USER_ERROR":
      return {
        ...state,
        editProfileErrorMessage: payload.error,
      };
    case "CLEAR_EDIT_MESSAGES":
      return {
        ...state,
        editProfileSuccessMessage: "",
        editProfileErrorMessage: "",
      };
    case "UPLOAD_PICTURE_SUCCESS":
      return {
        ...state,
        uploadPictureSuccessMessage: payload.message,
      };
    case "UPLOAD_PICTURE_ERROR":
      return {
        ...state,
        uploadPictureErrorMessage: payload.error,
      };
    case "CLEAR_UPLOAD_SUCCESS":
      return {
        ...state,
        uploadPictureSuccessMessage: "",
      };
    case "CLEAR_UPLOAD_ERROR":
      return {
        ...state,
        uploadPictureErrorMessage: "",
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  users: userReducer,
  information: informationReducer,
  transactions: transactionReducer,
});
