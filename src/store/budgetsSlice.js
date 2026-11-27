import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("finance_tracker_budgets");
    if (saved) return JSON.parse(saved);
    return null;
  } catch {
    return null;
  }
};
const starterBudgets = [
  { id: 1, category: "Food", limit: 6000, month: "2026-11", color: "#f97316" },
  {
    id: 2,
    category: "Transport",
    limit: 2000,
    month: "2026-11",
    color: "#3b82f6",
  },
  {
    id: 3,
    category: "Airtime",
    limit: 1500,
    month: "2026-11",
    color: "#a855f7",
  },
  {
    id: 4,
    category: "Entertainment",
    limit: 1500,
    month: "2026-11",
    color: "#ec4899",
  },
  {
    id: 5,
    category: "Shopping",
    limit: 3000,
    month: "2026-11",
    color: "#22c55e",
  },
];
const initialState = {
  list: loadFromStorage() || starterBudgets,
};

const saveToStorage = (list) => {
  localStorage.setItem("finance_tracker_budgets", JSON.stringify(list));
};

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    addBudget: (state, action) => {
      const newBudget = { ...action.payload, id: Date.now() };
      state.list.push(newBudget);
      saveToStorage(state.list);
    },
    deleteBudget: (state, action) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
      saveToStorage(state.list);
    },
    editBudget: (state, action) => {
      const index = state.list.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveToStorage(state.list);
      }
    },
    clearBudgets: (state) => {
      state.list = [];
      saveToStorage(state.list);
    },
  },
});
export const { addBudget, deleteBudget, editBudget, clearBudgets } =
  budgetsSlice.actions;
export default budgetsSlice.reducer;

export const selectSpentForCategory = (state, category) => {
  return state.transactions.list
    .filter((t) => t.type === "expense" && t.category === category)
    .reduce((sum, t) => sum + Number(t.amount), 0);
};
export const getBudgetStatus = (spent, limit) => {
  const percent = limit > 0 ? (spent / limit) * 100 : 0;
  if (percent >= 100)
    return {
      label: "Over Budget",
      color: "bg-red-500",
      textColor: "text-red-600",
      percent,
    };
  if (percent >= 80)
    return {
      label: "Warning",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      percent,
    };
  return {
    label: "On Track",
    color: "bg-green-500",
    textColor: "text-green-600",
    percent,
  };
};
