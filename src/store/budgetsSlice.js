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
