import { createSlice } from "@reduxjs/toolkit";
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('finance_tracker_goals')
    if (saved) return JSON.parse(saved)
    return null
  } catch {
    return null
  }
}
const starterGoals = [
  {
    id: 1,
    title: 'New Laptop',
    target: 60000,
    saved: 18500,
    deadline: '2027-03-01',
    color: '#3b82f6',
    createdAt: '2026-11-01'
  },
  {
    id: 2,
    title: 'Emergency Fund',
    target: 20000,
    saved: 12000,
    deadline: '2027-01-31',
    color: '#22c55e',
    createdAt: '2026-11-05'
  },
  {
    id: 3,
    title: 'Trip to Mombasa',
    target: 15000,
    saved: 3500,
    deadline: '2026-12-20',
    color: '#f97316',
    createdAt: '2026-11-10'
  },
]