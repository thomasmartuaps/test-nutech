import type { Transaction } from "~/types";
import type { TransactionAction } from "../actions";

interface TransactionState {
  balance: string;
  currentOffset: number;
  isFetched: boolean;
  isTopUpSuccess: boolean;
  isTransactionSuccess: boolean;
  topUpErrorMessage: string;
  transactionErrorMessage: string;
  transactions: Transaction[];
}

const initTransactionState: TransactionState = {
  balance: "",
  currentOffset: 0,
  isFetched: false,
  isTopUpSuccess: false,
  isTransactionSuccess: false,
  topUpErrorMessage: "",
  transactionErrorMessage: "",
  transactions: [],
};

export function transactionReducer(
  state = initTransactionState,
  action: TransactionAction,
) {
  const { type, payload } = action;
  switch (type) {
    case "SET_BALANCE":
      return { ...state, balance: payload.balance };
    case "TOP_UP_SUCCESS":
      return { ...state, isTopUpSuccess: true };
    case "CLEAR_TOP_UP_SUCCESS":
      return { ...state, isTopUpSuccess: false };
    case "SET_TOP_UP_ERROR":
      return { ...state, topUpErrorMessage: payload.error };
    case "CLEAR_TOP_UP_ERROR":
      return { ...state, topUpErrorMessage: "" };
    case "FETCH_MORE_TRANSACTIONS":
      return {
        ...state,
        currentOffset: payload.offset,
      };
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: [...payload.transactions],
        isFetched: true,
      };
    case "SET_MORE_TRANSACTIONS":
      return {
        ...state,
        transactions: [...state.transactions, ...payload.transactions],
      };
    case "TRANSACTION_SUCCESS":
      return { ...state, isTransactionSuccess: true };
    case "CLEAR_TRANSACTION_SUCCESS":
      return {
        ...state,
        isTransactionSuccess: false,
      };
    case "TRANSACTION_FAILED":
      return {
        ...state,
        transactionErrorMessage: payload.error,
        isTransactionSuccess: false,
      };
    case "CLEAR_TRANSACTION_ERROR":
      return {
        ...state,
        transactionErrorMessage: "",
      };
    default:
      return state;
  }
}
