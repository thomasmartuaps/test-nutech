import type { Transaction } from "~/types";

interface TransactionState {
  balance: number;
  isTopUpSuccess: boolean;
  topUpErrorMessage: string;
  transactions: Transaction[];
}

const initTransactionState: TransactionState = {
  balance: 0,
  isTopUpSuccess: false,
  topUpErrorMessage: "",
  transactions: [],
};

export function transactionReducer(state = initTransactionState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "GET_BALANCE":
      return { ...state, balance: payload.balance };
    case "TOP_UP_SUCCESS":
      return { ...state, isTopUpSuccess: true };
    case "SET_TOP_UP_ERROR":
      return { ...state, topUpErrorMessage: payload.error };
    case "CLEAR_TOP_UP_ERROR":
      return { ...state, topUpErrorMessage: "" };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: payload.transactions };
    default:
      return state;
  }
}
