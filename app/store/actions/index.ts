import type { RegistrationData, ProfileData } from "~/types";

export type UserAction =
  | {
      type: "REGISTRATION";
      payload: RegistrationData;
    }
  | {
      type: "LOGIN";
      payload: {
        email: string;
        password: string;
      };
    }
  | {
      type: "FETCH_PROFILE";
      payload: {};
    }
  | {
      type: "SET_PROFILE";
      payload: {
        profile: ProfileData;
      };
    }
  | {
      type: "SET_LOADING";
      payload: {
        isLoading: boolean;
      };
    }
  | {
      type: "EDIT_USER";
      payload: {
        user: ProfileData;
      };
    }
  | {
      type: "ADD_USER";
      payload: {
        user: ProfileData;
      };
    }
  | {
      type: "DELETE_USER";
      payload: {
        id: number;
      };
    };
