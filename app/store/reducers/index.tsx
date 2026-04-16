import { combineReducers } from "redux";
import type { UserAction } from "../actions";
import type { ProfileData } from "~/types";

interface UsersState {
  profile: ProfileData | null;
  balance: number;
  isLoading: boolean;
}

const initUsersState: UsersState = {
  profile: null,
  balance: 0,
  isLoading: false,
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
      return {
        ...state,
        profile: payload.profile,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  users: userReducer,
});
