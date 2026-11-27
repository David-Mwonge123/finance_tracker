import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('fintrack_budgets')
    if (saved) return JSON.parse(saved)
    return null
  } catch {
    return null
  }
}