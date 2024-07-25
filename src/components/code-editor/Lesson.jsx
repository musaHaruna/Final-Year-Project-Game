import React, { useState } from 'react'
import Workspace from './Workspace'
import Output from './Output'
import ControlButtons from './ControlButtons'
import Toolbar from './Toolbar'

const Lesson = ({ elements, handlePlay, handleNextStep, instructions }) => {
  const [workspace, setWorkspace] = useState([])
  const [output, setOutput] = useState(null)
  const [history, setHistory] = useState([])
  const [stepIndex, setStepIndex] = useState(0)
  const [stepFeedback, setStepFeedback] = useState('')

  const handleDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text')
    const newWorkspace = [...workspace, { type: data, value: '' }]
    setHistory([...history, workspace])
    setWorkspace(newWorkspace)
  }

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text', item)
  }

  const handleReset = () => {
    setHistory([...history, workspace])
    setWorkspace([])
    setOutput(null)
    setStepIndex(0)
    setStepFeedback('')
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
    <div className='mx-auto p-4'>
      <div className='flex space-x-8'>
        <Workspace
          workspace={workspace}
          handleDrop={handleDrop}
          handleChange={handleChange}
        />
        <Output output={output} />
      </div>

      <ControlButtons
        handleReset={handleReset}
        handleUndo={handleUndo}
        handlePlay={() => handlePlay(workspace, setOutput)}
        handleCheckStep={() =>
          handleNextStep(workspace, stepIndex, setStepIndex, setStepFeedback)
        }
      />

      <div className='mt-8'>
        <h3 className='text-md font-medium mb-2'>Instructions:</h3>
        <ol className='list-decimal list-inside'>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className='mt-8'>
        <Toolbar elements={elements} handleDragStart={handleDragStart} />
      </div>

      {stepFeedback && (
        <div className='mt-4 p-2 bg-green-200 text-green-800 rounded'>
          {stepFeedback}
        </div>
      )}
    </div>
  )
}

export default Lesson
