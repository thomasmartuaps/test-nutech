import { combineReducers } from "redux";
import type { UserAction } from "../actions";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  img?: string;
}

interface UsersState {
  users: Array<User>;
  isLoading: boolean;
  currentUser: User | null;
}

const initUsersState: UsersState = {
  users: [],
  isLoading: false,
  currentUser: null,
};

export function userReducer(state = initUsersState, action: UserAction) {
  const { type, payload } = action;
  switch (type) {
    case "REGISTRATION":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case "EDIT_USER":
      const newUser = payload.user;
      const usersList = state.users.map((val) => {
        if (newUser.id === val.id) {
          return newUser;
        }
        return val;
      });
      return {
        ...state,
        users: usersList,
        isLoading: false,
      };
    case "ADD_USER":
      const newUsers = [...state.users, payload.user];
      return {
        ...state,
        users: newUsers,
        isLoading: false,
      };
    case "DELETE_USER":
      const deletedUser = state.users.filter((val) => val.id !== payload.id);
      return {
        ...state,
        users: deletedUser,
        isLoading: false,
      };
    case "SET_USERS":
      const fetchedUsersWithImg = payload.users.map((val) => {
        return {
          ...val,
          img: `https://picsum.photos/id/${val.id}/200/300`,
        };
      });
      return {
        ...state,
        users: fetchedUsersWithImg,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  users: userReducer,
});
