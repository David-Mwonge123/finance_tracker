import { createSlice } from '@reduxjs/toolkit'

//Load from LocalStorage if it exists, else use starter data
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('finance_tracker_transactions')
    if (saved) return JSON.parse(saved)
    return null
  } catch {
    return null
  }
}

const starterData = [
  { id: 1, title: 'HELB Loan', amount: 20000, type: 'income', category: 'Allowance', method: 'Bank', date: '2026-11-25', note: 'Semester disbursement' },
  { id: 2, title: 'Part-time Tutoring', amount: 5000, type: 'income', category: 'Work', method: 'Mpesa', date: '2026-11-20', note: 'Form 2 maths' },
  { id: 3, title: 'Lunch - Kibandaski', amount: 500, type: 'expense', category: 'Food', method: 'Mpesa', date: '2026-11-26', note: '' },
  { id: 4, title: 'Matatu to Town', amount: 150, type: 'expense', category: 'Transport', method: 'Cash', date: '2026-11-26', note: '' },
  { id: 5, title: 'Airtime Safaricom', amount: 200, type: 'expense', category: 'Airtime', method: 'Mpesa', date: '2026-11-25', note: 'Weekly bundle' },
  { id: 6, title: 'Groceries - Naivas', amount: 1800, type: 'expense', category: 'Food', method: 'Bank', date: '2026-11-22', note: 'Rice, cooking oil, eggs' },
  { id: 7, title: 'Netflix', amount: 700, type: 'expense', category: 'Entertainment', method: 'Card', date: '2026-11-18', note: 'Monthly' },
  { id: 8, title: 'Data Bundle 10GB', amount: 1000, type: 'expense', category: 'Airtime', method: 'Mpesa', date: '2026-11-15', note: '' },
]

const initialState = {
  list: loadFromStorage() || starterData,
  //For filters
  filter: 'all',
  search: '',
  categoryFilter: 'all',
}

const saveToStorage = (list) => {
  localStorage.setItem('finance_tracker_transactions', JSON.stringify(list))
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTx = { ...action.payload, id: Date.now() }
      state.list.unshift(newTx)
      saveToStorage(state.list)
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload)
      saveToStorage(state.list)
    },
    editTransaction: (state, action) => {
      const index = state.list.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
        saveToStorage(state.list)
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload
    },
    clearAllTransactions: (state) => {
      state.list = []
      saveToStorage(state.list)
    }
  }
})

export const {
  addTransaction,
  deleteTransaction,
  editTransaction,
  setFilter,
  setSearch,
  setCategoryFilter,
  clearAllTransactions
} = transactionsSlice.actions

export default transactionsSlice.reducer

//Selectors used by Dashboard & Report
export const selectTotalIncome = (state) =>
  state.transactions.list
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

export const selectTotalExpenses = (state) =>
  state.transactions.list
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

export const selectBalance = (state) =>
  selectTotalIncome(state) - selectTotalExpenses(state)