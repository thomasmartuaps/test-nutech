import type { RegistrationData } from "~/types";
import type { User } from "../reducers";

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
      type: "SET_LOADING";
      payload: {
        isLoading: boolean;
      };
    }
  | {
      type: "EDIT_USER";
      payload: {
        user: User;
      };
    }
  | {
      type: "ADD_USER";
      payload: {
        user: User;
      };
    }
  | {
      type: "DELETE_USER";
      payload: {
        id: number;
      };
    }
  | {
      type: "SET_USERS";
      payload: {
        users: Array<User>;
      };
    };
