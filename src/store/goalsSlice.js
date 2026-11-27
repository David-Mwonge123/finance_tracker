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