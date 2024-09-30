import React, { createContext, useContext, useState, useEffect } from 'react'

// Create a context for points
const PointsContext = createContext()

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0)

  // Load points from localStorage when the component mounts
  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem('points')) || 0
    setPoints(savedPoints)
  }, [])

  // Update localStorage when points change
  useEffect(() => {
    localStorage.setItem('points', points)
  }, [points])

  const addPoints = (value) => {
    setPoints((prev) => prev + value)
  }

  const deductPoints = (value) => {
    setPoints((prev) => Math.max(0, prev - value)) // Ensure points don't go negative
  }

  const resetPoints = () => {
    setPoints(0)
  }

  return (
    <PointsContext.Provider
      value={{ points, addPoints, deductPoints, resetPoints }}
    >
      {children}
    </PointsContext.Provider>
  )
}

export const usePoints = () => useContext(PointsContext)
