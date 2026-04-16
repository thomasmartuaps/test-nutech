interface TransactionState {
  balance: number;
}

const initTransactionState = { balance: 0 };

export function transactionReducer(state = initTransactionState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case "GET_BALANCE":
      return { ...state, balance: payload.balance };
    default:
      return state;
  }
}
