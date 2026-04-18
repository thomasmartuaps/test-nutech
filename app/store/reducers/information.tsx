import type { Banner, Service } from "~/types";
import type { ModuleAction } from "../actions";

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

export function informationReducer(
  state = initModuleState,
  action: ModuleAction,
) {
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
