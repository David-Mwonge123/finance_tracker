import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import budgetsReducer from "./budgetsSlice";
import goalsReducer from "./goalsSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgets: budgetsReducer,
    goals: goalsReducer,
  },
});

export default store;
