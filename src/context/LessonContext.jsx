import React, { createContext, useContext, useState } from 'react'

// Context for Lesson State
const LessonContext = createContext()

const LessonProvider = ({ children }) => {
  const [workspace, setWorkspace] = useState([])
  const [output, setOutput] = useState(null)
  const [history, setHistory] = useState([])

  const handleDrop = (e, data) => {
    e.preventDefault()
    const newWorkspace = [...workspace, { type: data, value: '' }]
    setHistory([...history, workspace])
    setWorkspace(newWorkspace)
  }

  const handleReset = () => {
    setHistory([...history, workspace])
    setWorkspace([])
    setOutput(null)
  }

  const handleUndo = () => {
    if (history.length > 0) {
      const previousWorkspace = history[history.length - 1]
      setWorkspace(previousWorkspace)
      setHistory(history.slice(0, -1))
    }
  }

  const handleChange = (index, newValue) => {
    const newWorkspace = workspace.map((item, i) => {
      if (i === index) {
        return { ...item, value: newValue }
      }
      return item
    })
    setHistory([...history, workspace])
    setWorkspace(newWorkspace)
  }

  return (
    <LessonContext.Provider
      value={{
        workspace,
        output,
        setOutput,
        handleDrop,
        handleReset,
        handleUndo,
        handleChange,
      }}
    >
      {children}
    </LessonContext.Provider>
  )
}

const useLesson = () => useContext(LessonContext)

export { LessonProvider, useLesson }
