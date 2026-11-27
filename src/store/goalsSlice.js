import { createSlice } from "@reduxjs/toolkit";
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("finance_tracker_goals");
    if (saved) return JSON.parse(saved);
    return null;
  } catch {
    return null;
  }
};
const starterGoals = [
  {
    id: 1,
    title: "New Laptop",
    target: 60000,
    saved: 18500,
    deadline: "2027-03-01",
    color: "#3b82f6",
    createdAt: "2026-11-01",
  },
  {
    id: 2,
    title: "Emergency Fund",
    target: 20000,
    saved: 12000,
    deadline: "2027-01-31",
    color: "#22c55e",
    createdAt: "2026-11-05",
  },
  {
    id: 3,
    title: "Trip to Mombasa",
    target: 15000,
    saved: 3500,
    deadline: "2026-12-20",
    color: "#f97316",
    createdAt: "2026-11-10",
  },
];
const initialState = {
  list: loadFromStorage() || starterGoals,
};

const saveToStorage = (list) => {
  localStorage.setItem("finance_tracker_goals", JSON.stringify(list));
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      const newGoal = {
        ...action.payload,
        id: Date.now(),
        saved: Number(action.payload.saved) || 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      state.list.push(newGoal);
      saveToStorage(state.list);
    },
    deleteGoal: (state, action) => {
      state.list = state.list.filter((g) => g.id !== action.payload);
      saveToStorage(state.list);
    },
    editGoal: (state, action) => {
      const index = state.list.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
        saveToStorage(state.list);
      }
    },
    //Add money to a goal
    addMoneyToGoal: (state, action) => {
      const { id, amount } = action.payload;
      const goal = state.list.find((g) => g.id === id);
      if (goal) {
        goal.saved = Number(goal.saved) + Number(amount);
        saveToStorage(state.list);
      }
    },
    //Withdraw money from a goal
    withdrawFromGoal: (state, action) => {
      const { id, amount } = action.payload;
      const goal = state.list.find((g) => g.id === id);
      if (goal) {
        goal.saved = Math.max(0, Number(goal.saved) - Number(amount));
        saveToStorage(state.list);
      }
    },
    clearGoals: (state) => {
      state.list = [];
      saveToStorage(state.list);
    },
  },
});
export const {
  addGoal,
  deleteGoal,
  editGoal,
  addMoneyToGoal,
  withdrawFromGoal,
  clearGoals,
} = goalsSlice.actions;

export default goalsSlice.reducer;

export const getGoalProgress = (goal) => {
  if (!goal.target || Number(goal.target) === 0) return 0;
  return Math.min(
    100,
    Math.round((Number(goal.saved) / Number(goal.target)) * 100),
  );
};
