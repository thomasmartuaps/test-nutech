import type { useNavigate } from "react-router";
import type { RegistrationData, ProfileData, Banner, Service } from "~/types";

export type UserAction =
  | {
      type: "REGISTRATION";
      payload: {
        data: RegistrationData;
        navigate: ReturnType<typeof useNavigate>;
      };
    }
  | {
      type: "LOGIN";
      payload: {
        data: {
          email: string;
          password: string;
        };
        navigate: ReturnType<typeof useNavigate>;
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
  | { type: "SET_REGIS_ERROR"; payload: { error: string } }
  | { type: "CLEAR_REGIS_ERROR"; payload: {} }
  | { type: "SET_LOGIN_ERROR"; payload: { error: string } }
  | { type: "CLEAR_LOGIN_ERROR"; payload: {} }
  | { type: "SET_PROFILE_ERROR"; payload: { error: string } }
  | { type: "CLEAR_PROFILE_ERROR"; payload: {} }
  | {
      type: "EDIT_USER";
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

export type ModuleAction =
  | {
      type: "FETCH_BANNERS";
      payload: {};
    }
  | {
      type: "SET_BANNERS";
      payload: {
        banners: Banner[];
      };
    }
  | {
      type: "FETCH_SERVICES";
      payload: {};
    }
  | {
      type: "SET_SERVICES";
      payload: {
        services: Service[];
      };
    }
  | {
      type: "SET_ACTIVE_SERVICE";
      payload: {
        service: Service | null;
      };
    };

export type TransactionAction =
  | {
      type: "TOP_UP";
      payload: {
        amount: number;
      };
    }
  | {
      type: "GET_BALANCE";
      payload: {};
    }
  | {
      type: "SET_BALANCE";
      payload: {
        balance: number;
      };
    };
