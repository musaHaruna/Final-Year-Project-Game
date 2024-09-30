import React, { createContext, useReducer, useContext } from 'react'

// Initial state
const initialProgress = [100, 100, 100, 100, 0, 0]

// Reducer function
function progressReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROGRESS':
      return state.map((p, i) => (i === action.index ? action.progress : p))
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

// Create context
const ProgressContext = createContext()

// Context provider component
export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, initialProgress)

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  )
}

// Custom hook to use the progress context
export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
