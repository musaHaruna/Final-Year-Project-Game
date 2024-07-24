import React, { useState } from 'react'
import Workspace from './Workspace'
import Output from './Output'
import ControlButtons from './ControlButtons'
import Toolbar from './Toolbar'

const Lesson = ({ elements, handlePlay }) => {
  const [workspace, setWorkspace] = useState([])
  const [output, setOutput] = useState(null)
  const [history, setHistory] = useState([])

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
    <div className='container mx-auto p-4'>
      <h2 className='text-xl font-medium mb-4'>
        Drag and drop elements to declare and initialize variables.
      </h2>
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
      />

      <div className='mt-8'>
        <h3 className='text-md font-medium mb-2'>Instructions:</h3>
        <ol className='list-decimal list-inside'>
          {elements
            .filter((element) => element.variable)
            .map((element, index) => (
              <li key={index}>
                Drag and drop {element.variable.split(' ')[0]} and input a{' '}
                {element.variable.split(' ')[0]}.
              </li>
            ))}
          <li>Click PLAY to see the declared variables in the output.</li>
        </ol>
      </div>

      <div className='mt-8'>
        <Toolbar elements={elements} handleDragStart={handleDragStart} />
      </div>
    </div>
  )
}

export default Lesson
